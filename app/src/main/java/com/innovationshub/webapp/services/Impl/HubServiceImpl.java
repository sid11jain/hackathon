package com.innovationshub.webapp.services.Impl;

import java.util.ArrayList;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innovationshub.webapp.services.IHubService;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;

/**
 * @author Sid
 * @since Jun 12, 2020 19:43
 */
@Service
public class HubServiceImpl  implements IHubService {

    @Autowired
    private MongoTemplate mongoTemplate;

    private final Logger LOG;

    HubServiceImpl(){
        LOG = LoggerFactory.getLogger(HubServiceImpl.class);
    }

    @Override
    public Object addIdea(Object idea) throws  Exception {
        Object insertedIdea = null;
        if(null != idea){
            ObjectMapper obj = new ObjectMapper();


            Document doc = Document.parse((String)idea);


            // For now assuming that idea will be the collection name in mongo
            insertedIdea   = mongoTemplate.insert(idea, "idea");

        }

        return insertedIdea;
    }

    // Ajay's methods for reference

   /* public void insertRawData(@RequestBody HubJSONWrapper payload) {
        try {
            //Inserting raw JSON into collection
            JSONObject obj = payload.getPayloadData();
            mongoTemplate.insert(obj, "Hotels");
            //Finding documents based on configurable fields
            MongoClient client = MongoClients.create();
            MongoDatabase db = client.getDatabase("HotelDb");
            MongoCollection<Document> collection = db.getCollection("Hotels");
            long count = collection.countDocuments();
            //Find documents by applying filters
            Document filterDoc = new Document();
            //            filterDoc.append("Hello", "Welcome");
            filterDoc.append("name", "Marriot");
            FindIterable<Document> matchingDocs = collection.find(filterDoc);
            Document filteredDoc = matchingDocs.first();
            //Find documents based on multiple conditions
            AggregateIterable<Document> documents
                    = collection.aggregate(
                    Arrays.asList(
                            Aggregates.match(in("name", Arrays.asList("Marriot", "Ibis"))), //!! Order is important here
                            Aggregates.sort(Sorts.ascending("name"))
                    ));
            List<Document> docs = new ArrayList<>();
            for(Document doc : documents) {
                docs.add(doc);
            }
            System.out.println(count);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }*/
}
