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
            // For now assuming that idea will be the collection name in mongo
            insertedIdea   = mongoTemplate.insert(idea, "idea");

        }

        return insertedIdea;
    }

    @Override
    public Object getIdea(Object idea) throws  Exception {
        if(null != idea){
              // Call to retrieve idea from idea name and return
        }

        // For now returning same idea for testing purpose
        return idea;
    }

}
