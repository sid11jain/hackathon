package com.innovationshub.webapp.services.impl;

import java.util.ArrayList;
import java.util.List;

import javax.print.Doc;

import org.bson.Document;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovationshub.webapp.common.IHConstants;
import com.innovationshub.webapp.services.api.IHubDao;
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
        Object insertedIdea = collection.insertOne(Document.parse(idea.toString()));
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
            Object campaign = retrieveCampaignByName("Campaign1");
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
    public JSONArray findAllDocuments(String collectionName) {
        MongoCollection<Document> collection = db.getCollection(collectionName);
        FindIterable<Document> documents = collection.find();
        JSONArray allCollectionDoc = new JSONArray();
        for(Document doc: documents){
            if(null != doc){
                //JSONObject obj = new JSONObject(doc);
                allCollectionDoc.put(doc.toJson());
            }
        }
        return allCollectionDoc;
    }

    public JSONArray getAllIdeasForCampaignName(String campaignName) {
        MongoCollection<Document> collection = db.getCollection(IHConstants.IDEA_COLLECTION);
        BasicDBObject whereQuery = new BasicDBObject();
        whereQuery.put(IHConstants.CAMPAIGN_NAME_FIELD, campaignName);
        FindIterable<Document> ideas = collection.find(whereQuery);
        JSONArray ideasArr = new JSONArray();
        for (Document idea : ideas) {
            if (idea != null) {
                Object campaign = retrieveCampaignByName(campaignName);
                if (null != campaign) {
                    idea.append(IHConstants.CAMPAIGN_FIELD, campaign);
                }
                JSONObject obj = new JSONObject(idea);
                ideasArr.put(obj);
            }
        }
        return ideasArr;
    }
}
