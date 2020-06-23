package com.innovationshub.webapp.services.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innovationshub.webapp.common.IHConstants;
import com.innovationshub.webapp.models.Filters;
import com.innovationshub.webapp.services.api.IHubDao;
import com.innovationshub.webapp.util.DBUtility;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;

/**
 * Implementation class for database operations.
 *
 * @author AJAYLAMBA
 * @since Jun 12, 2020 10:01 PM
 */
@Service
public class HubDaoImpl implements IHubDao {
    @Autowired
    private MongoClient mongoClient;
    private MongoDatabase db;

    public HubDaoImpl() {
        this.mongoClient = MongoClients.create();
        //TODO: Use ApplicationProperties class to get property value, use autowiring
        this.db = this.mongoClient.getDatabase(IHConstants.DATABASE_NAME);
    }

    @Override
    public Object addIdea(Object idea) {
        MongoCollection<Document> collection = db.getCollection(IHConstants.IDEA_COLLECTION);
        Map ideaAsMap = null;
        Object insertedIdea = null;
        try{
            ideaAsMap= (!Map.class.isAssignableFrom(idea.getClass())?(new ObjectMapper()).readValue((String)idea, Map.class): (Map)idea);
        }catch (Exception e){
            // swallowing the exception
        }

        if(ideaAsMap.size()>0){
            BasicDBObject exists = new BasicDBObject();
            exists.put(IHConstants.NAME_FIELD , ideaAsMap.get(IHConstants.NAME_FIELD));
            FindIterable<Document> found = collection.find(exists).limit(1);

            if(null != found.first()){
                insertedIdea = null;
            }else{
                Document newIdea = Document.parse(idea.toString());
                newIdea.put(IHConstants.IDEA_FIELD_POSTED_ON, new Date());
                formatIdeaDates(newIdea);
                insertedIdea = collection.insertOne(newIdea);
            }
        }
        return insertedIdea;
    }

    @Override
    public long deleteAllIdeasForName(String name) {
        MongoCollection<Document> collection = db.getCollection(IHConstants.IDEA_COLLECTION);
        String whereClause = "{ $and : [ { name: { $in: [\"" + name +"\"] } } ] }";
        BasicDBObject query = BasicDBObject.parse(whereClause);
        DeleteResult result = collection.deleteMany(query);
        return result.getDeletedCount();
    }

    @Override
    public Object retrieveIdeaByName(String ideaName) {
        MongoCollection<Document> collection = db.getCollection(IHConstants.IDEA_COLLECTION);
        BasicDBObject whereQuery = new BasicDBObject();
        whereQuery.put(IHConstants.NAME_FIELD, ideaName);

        FindIterable<Document> ideas = collection.find(whereQuery);
        Document idea = ideas.first();
        if (idea != null) {
            //Campaign name field is not present in Idea, so using name of existing campaign
            Object campaign = retrieveCampaignByName(idea.getString(IHConstants.CAMPAIGN_NAME));
            if (null != campaign) {
                idea.append(IHConstants.CAMPAIGN_FIELD, campaign);
            }

            return idea;
        }
        //Idea not found
        return null;
    }

    @Override
    public Object retrieveCampaignByName(String campaignName) {
        MongoCollection<Document> collection = db.getCollection(IHConstants.CAMPAIGN_COLLECTION);
        BasicDBObject campaignQuery = new BasicDBObject();
        campaignQuery.put(IHConstants.NAME_FIELD, campaignName);
        FindIterable<Document> campaigns = collection.find(campaignQuery);
        return campaigns.first();
    }

    @Override
    public List findAllDocuments(String collectionName, Object filters) throws Exception {
        ArrayList<Object> allCollectionDoc = new ArrayList<>();
        BasicDBObject whereQuery = new BasicDBObject();
        MongoCollection<Document> collection = db.getCollection(collectionName);
        if(null != filters){
            whereQuery = BasicDBObject.parse(DBUtility.buildQuery((Map) filters));
        }

        // find with whereQuery
        FindIterable<Document> documents = collection.find(whereQuery);

        if(StringUtils.equals(IHConstants.IDEA_COLLECTION, collectionName)){
            BasicDBObject sortOrder = new BasicDBObject(IHConstants.IDEA_FIELD_POSTED_ON, -1);
            sortOrder.append(IHConstants.IDEA_FIELD_CAMPAIGN_END_DATE, 1);
            documents.sort(sortOrder).limit(200);
            allCollectionDoc.addAll(getCampaignOnIdeas(documents));
        } else{
            for(Document doc: documents){
                if(null != doc){
                    allCollectionDoc.add(doc);
                }
            }
        }
        return allCollectionDoc;
    }

    public List getAllIdeasForCampaignName(String campaignName) {
        MongoCollection<Document> collection = db.getCollection(IHConstants.IDEA_COLLECTION);
        BasicDBObject whereQuery = new BasicDBObject();

        if(StringUtils.isNotBlank(campaignName)) {
            whereQuery.put(IHConstants.CAMPAIGN_NAME_FIELD, campaignName);
        }
        FindIterable<Document> ideas = collection.find(whereQuery);

        return getCampaignOnIdeas(ideas);
    }

    private List getCampaignOnIdeas(FindIterable<Document> ideas){
        HashMap<String, Object> campaignsMap = new HashMap<>();
        ArrayList<Object> ideasArr = new ArrayList<>();
        Object campaign = null;
        for (Document idea : ideas) {
            if (idea != null) {
                String ideaCampaignName = idea.getString(IHConstants.CAMPAIGN_NAME);
                if(null == campaignsMap.get(ideaCampaignName)){
                    Object ideaCampaign = retrieveCampaignByName(ideaCampaignName);
                    campaignsMap.put(ideaCampaignName, ideaCampaign);
                    campaign = ideaCampaign;
                } else{
                    campaign = campaignsMap.get(ideaCampaignName);
                }

                if (null != campaign) {
                    idea.append(IHConstants.CAMPAIGN_FIELD, campaign);
                    // Adding idea only when campaign is present
                    ideasArr.add(idea);
                }
            }
        }
        return ideasArr;
    }

    @Override
    public Object updateCollectionDocument(Object datatypeToUpdate, List<String> attributes, String collectionName) throws Exception{
        return updateCollectionDocument(datatypeToUpdate, attributes, collectionName, IHConstants.NAME_FIELD);
    }

    public Object updateCollectionDocument(Object datatypeToUpdate, List<String> attributes, String collectionName, String collectionFieldToSearchExistingDoc) throws Exception{
        MongoCollection<Document> collection = db.getCollection(collectionName);
        BasicDBObject filterQuery = new BasicDBObject();
        BasicDBObject setValues = new BasicDBObject();
        Map ideaAsMap = (!Map.class.isAssignableFrom(datatypeToUpdate.getClass())?(new ObjectMapper()).readValue((String) datatypeToUpdate, Map.class): (Map) datatypeToUpdate);
        filterQuery.put(collectionFieldToSearchExistingDoc, ideaAsMap.get(collectionFieldToSearchExistingDoc));

        BasicDBObject updateValues = new BasicDBObject();

        for(String attribute: attributes){
            updateValues.put(attribute, ideaAsMap.get(attribute));
        }
        setValues.put("$set", updateValues);
        collection.updateOne(filterQuery, setValues);
        return datatypeToUpdate;
    }

    @Override
    public void addUpdateFilters(Object filters) throws Exception{
        MongoCollection<Document> collection = db.getCollection(IHConstants.FILTERS_COLLECTION);
        List<Document> docsToInsert = new ArrayList<>();
        if (null != filters) {
            if (List.class.isAssignableFrom(filters.getClass())) {
                List insertDocumets = (List) filters;
                if (null != insertDocumets && insertDocumets.size() > 0) {
                    for (Map document : (List<Map>) filters) {
                        Document existingFilter = getFilterIfExist(collection, (String) document.get(IHConstants.FILTER_NAME));
                        if (null != existingFilter) {
                            //List filterValues = (List)existingFilter.get(IHConstants.VALUES);
                            List existingFilterValues = DBUtility.getTransformedFilterValues((List) existingFilter.get(IHConstants.VALUES));
                            List newFilterValues = DBUtility.getTransformedFilterValues((List) document.get(IHConstants.VALUES));
                            Set<Filters> combinedFilterValues = new LinkedHashSet<>(existingFilterValues);
                            combinedFilterValues.addAll(newFilterValues);
                            List combinedFilterValuesList = DBUtility.transformedFilterValuesToMap(new ArrayList<>(combinedFilterValues));
                            //existingFilter.put(IHConstants.VALUES, combinedFilterValuesList);
                            updateCollectionDocument(new LinkedHashMap<String, Object>() {{
                                put(IHConstants.FILTER_NAME, (String) document.get(IHConstants.FILTER_NAME));
                                put(IHConstants.VALUES, combinedFilterValuesList);
                            }}, Arrays.asList(IHConstants.VALUES), IHConstants.FILTERS_COLLECTION, IHConstants.FILTER_NAME);
                        } else {
                            collection.insertOne(new Document(document));
                        }
                    }
                }
            } else {
                Map incomingFilters = ((Map) filters);
                Document existingFilter = getFilterIfExist(collection, (String)incomingFilters.get(IHConstants.FILTER_NAME));
                if(null != existingFilter){
                    mergeAndUpdateWithExistingFilterValues(existingFilter, incomingFilters);
                    // update with predicate on merging filter - comparing on value.
                }else{
                    collection.insertOne(new Document(incomingFilters));
                }
            }
        }
    }

    private Document getFilterIfExist(MongoCollection<Document> collection , String filterName){
        Document filter = null;
        BasicDBObject exists = new BasicDBObject();
        exists.put(IHConstants.FILTER_NAME , filterName);
        FindIterable<Document> found = collection.find(exists).limit(1);
        filter = found.first();
        return filter;
    }

    private void mergeAndUpdateWithExistingFilterValues(Document existingFilter, Map newFilters) throws  Exception{
        if(null != existingFilter){
            List existingFilterValues = DBUtility.getTransformedFilterValues((List)existingFilter.get(IHConstants.VALUES));
            List newFilterValues = DBUtility.getTransformedFilterValues((List)newFilters.get(IHConstants.VALUES));
            Set<Filters> combinedFilterValues = new LinkedHashSet<>(existingFilterValues);
            combinedFilterValues.addAll(newFilterValues);
            List<Filters> combinedFilterValuesList = new ArrayList<>(combinedFilterValues);
            updateCollectionDocument(combinedFilterValuesList, Arrays.asList(IHConstants.VALUES), IHConstants.FILTERS_COLLECTION, IHConstants.FILTER_NAME);
        }
    }

    @Override
    public int addDocument(String collectionName, Object documents) throws Exception {
        int added = 0;
        MongoCollection<Document> collection = db.getCollection(collectionName);
        List<Document> docsToInsert = new ArrayList<>();
        if (null != documents) {
            if (List.class.isAssignableFrom(documents.getClass())) {
                List insertDocumets = (List) documents;
                if (null != insertDocumets && insertDocumets.size() > 0) {
                    for (Map document : (List<Map>) documents) {
                        formatDates(document);
                        docsToInsert.add( new Document(document));
                    }
                }
            } else {
                Document document = new Document((Map) documents);
                formatDates(document);
                docsToInsert.add(document);
            }
        }
        try {
            if (docsToInsert.size() > 0) {
                collection.insertMany(docsToInsert);
                added = docsToInsert.size();
            }
        } catch (Exception e) {
            // swallowing the exception for now
        }
        return added;
    }

    /**
     * Formats start and end dates from string to date format. Also puts createdOn date on document.
     *
     * @param document
     */
    private void formatDates(Map document) {
        // Default created on date
        document.put(IHConstants.FIELD_CREATED_ON, new Date());
        // Convert the start and end dates to Date format from String
        if (null != document.get(IHConstants.START_DATE)) {
            document.put(IHConstants.START_DATE, LocalDate.parse((String) document.get(IHConstants.START_DATE)));
        }
        if (null != document.get(IHConstants.END_DATE)) {
            document.put(IHConstants.END_DATE, LocalDate.parse((String) document.get(IHConstants.END_DATE)));
        }
    }

    /**
     * Formats campaign start and end dates from string to date format. Also puts postedOn date on idea.
     *
     * @param document
     */
    private void formatIdeaDates(Map document) {
        document.put(IHConstants.IDEA_FIELD_POSTED, new Date());
        // Convert the start and end dates to Date format from String
        if (null != document.get(IHConstants.CAMPAIGN_START_DATE)) {
            document.put(IHConstants.CAMPAIGN_START_DATE, LocalDate.parse((String) document.get(IHConstants.CAMPAIGN_START_DATE)));
        }
        if (null != document.get(IHConstants.CAMPAIGN_END_DATE)) {
            document.put(IHConstants.CAMPAIGN_END_DATE, LocalDate.parse((String) document.get(IHConstants.CAMPAIGN_END_DATE)));
        }
    }
}
