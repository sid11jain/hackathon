package com.innovationshub.webapp.services.Impl;

import org.bson.Document;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.innovationshub.webapp.services.IHubDao;
import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

/**
 * @author AJAYLAMBA
 * @since Jun 12, 2020 10:01 PM
 */
public class HubDaoImpl implements IHubDao {
    @Autowired
    private MongoTemplate mongoTemplate;
    private MongoClient mongoClient;
    private MongoDatabase db;
    private static final String COLLECTION_NAME = "Hotels";
    private static final String DATABASE_NAME = "HotelDb";

    public HubDaoImpl() {
        this.mongoClient = MongoClients.create();
        this.db = this.mongoClient.getDatabase(DATABASE_NAME);
    }

    @Override
    public void addIdea(JSONObject idea) {
        MongoCollection<Document> collection = db.getCollection(COLLECTION_NAME);
        collection.insertOne(Document.parse(idea.toString()));
    }

    @Override
    public void printAll() {
        MongoCollection<Document> collection = db.getCollection(COLLECTION_NAME);
        try {
            //For now constructing the search key object here, idea is to pass this from UI
            //and then searching based on that
            JSONObject searchKeys = new JSONObject();
            searchKeys.append("name", "Marriot");

            //This query needs to be modified to work properly
            BasicDBObject query = BasicDBObject.parse(searchKeys.toString());

            //Searching by constructing DB object here
            BasicDBObject whereClause = new BasicDBObject();
            whereClause.put("Hello", "Welcome");
            FindIterable<Document> cursor = collection.find(whereClause);
            for (Document doc : cursor) {
                System.out.println(doc.entrySet());
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
