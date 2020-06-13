package com.innovationshub.webapp.services.Impl;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

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
}
