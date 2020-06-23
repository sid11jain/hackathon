package com.innovationshub.webapp.services.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innovationshub.webapp.common.IHConstants;
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
//    @Autowired
//    private ApplicationProperties appProperties;

    public HubDaoImpl() {
        this.mongoClient = MongoClients.create();
        //TODO: Use ApplicationProperties class to get property value, use autowiring
        this.db = this.mongoClient.getDatabase(IHConstants.DATABASE_NAME);
//        this.db = this.mongoClient.getDatabase(appProperties.getProperty(IHConstants.DATABASE_NAME_FIELD));
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
                newIdea.put(IHConstants.IDEA_FIELD_POSTED, new Date());
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
    public void printAll() {
        MongoCollection<Document> collection = db.getCollection(IHConstants.IDEA_COLLECTION);
        //Find all documents
        FindIterable<Document> cursor = collection.find();
        for (Document doc : cursor) {
            System.out.println(doc.entrySet());
        }
        System.out.println("Search using AND query");
        //Searching by using two multiple conditions
        BasicDBObject andQuery = new BasicDBObject();
        List<BasicDBObject> objects = new ArrayList<>();
        objects.add(new BasicDBObject("Hello", "Welcome"));
        objects.add(new BasicDBObject("test", "value"));
        andQuery.put("$and", objects);
        FindIterable<Document> andCursor = collection.find(andQuery);
        for (Document doc : andCursor) {
            System.out.println(doc.entrySet());
        }
        System.out.println("Search using IN query");
        //Search using in clause
        BasicDBObject inQuery = new BasicDBObject();
        List<String> names = new ArrayList<>();
        names.add("Marriot");
        names.add("Ibis");
        inQuery.put("name", new BasicDBObject("$in", names));
        FindIterable<Document> inCursor = collection.find(inQuery);
        for (Document doc : inCursor) {
            System.out.println(doc.entrySet());
        }
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
//            Object campaign = retrieveCampaignByName(idea.get(IHConstants.CAMPAIGN_NAME_FIELD).toString());
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
        BasicDBObject selectFields = new BasicDBObject();
        MongoCollection<Document> collection = db.getCollection(collectionName);
        if(null != filters){
            whereQuery = BasicDBObject.parse(DBUtility.buildQuery((Map) filters));
        }
        /*if(StringUtils.equals(IHConstants.USERS_COLLECTION, collectionName)){
            whereQuery.append(IHConstants.USERS_FIELD_USERNAME,1);
            whereQuery.append(IHConstants.USERS_FIELD_FULLNAME,1);
        }*/

        // find with whereQuery
        FindIterable<Document> documents = collection.find(whereQuery);
        if(StringUtils.equals(IHConstants.IDEA_COLLECTION, collectionName)){
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
        // This if clause is to retrieve all ideas irrespective of campaign - for landing screen.
        // This shall be modified later.
        /*HashMap<String, Object> campaignsMap = new HashMap<>();
        ArrayList<Object> ideasArr = new ArrayList<>();
        Map ideaAsMap;
        Object campaign = null;*/
        if(StringUtils.isNotBlank(campaignName)) {
            whereQuery.put(IHConstants.CAMPAIGN_NAME_FIELD, campaignName);
        }
        FindIterable<Document> ideas = collection.find(whereQuery);

        /*for (Document idea : ideas) {
            if (idea != null) {
                campaign = null;
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
        }*/
        return getCampaignOnIdeas(ideas);
    }

    private List getCampaignOnIdeas(FindIterable<Document> ideas){
        HashMap<String, Object> campaignsMap = new HashMap<>();
        ArrayList<Object> ideasArr = new ArrayList<>();
        Map ideaAsMap;
        Object campaign = null;
        for (Document idea : ideas) {
            if (idea != null) {
                campaign = null;
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
    public Object updateIdeaDocument(Object datatypeToUpdate, List<String> attributes, String collectionName) throws Exception{
        MongoCollection<Document> collection = db.getCollection(collectionName);
        BasicDBObject filterQuery = new BasicDBObject();
        BasicDBObject setValues = new BasicDBObject();
        Map ideaAsMap = (!Map.class.isAssignableFrom(datatypeToUpdate.getClass())?(new ObjectMapper()).readValue((String) datatypeToUpdate, Map.class): (Map) datatypeToUpdate);
        filterQuery.put(IHConstants.NAME_FIELD, ideaAsMap.get(IHConstants.NAME_FIELD));

        BasicDBObject updateValues = new BasicDBObject();

        for(String attribute: attributes){
            updateValues.put(attribute, ideaAsMap.get(attribute));
        }
        setValues.put("$set", updateValues);
        collection.updateOne(filterQuery, setValues);
        return datatypeToUpdate;

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
                //Document newDocument = Document.parse(documents.toString());
                //newDocument.put(IHConstants.FIELD_CREATED_ON, new Date());
                collection.insertMany(docsToInsert);
                added = docsToInsert.size();
            }
        } catch (Exception e) {
            // swallowing the exception for now
        }
        return added;
    }

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
}
