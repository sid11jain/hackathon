package com.innovationshub.webapp.controllers;

import org.bson.Document;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innovationshub.webapp.models.Campaign;
import com.innovationshub.webapp.models.HubRequestWrapper;
import com.innovationshub.webapp.models.HubResponseWrapper;
import com.innovationshub.webapp.services.IHubService;
import jdk.nashorn.internal.parser.JSONParser;

/**
 * @author Sid
 * @since Jun 08, 2020 23:18
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LandingController {
    private static final String LANDING_URL = "";
    private static final String SUBMIT_IDEA = "/submit-idea";

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private IHubService hubService;

    @RequestMapping(value = LANDING_URL, produces = "application/json")
    public ResponseEntity<Object> landing() throws Exception {
        //        JSONParser jParser = new JSONParser();
        //        JSONObject jo = (JSONObject) jParser.parse("Sid testing");
        //GsonJsonParser gson = new GsonJsonParser();


        /*Campaign campaign1 = new Campaign("Campaign1", "Sid");

        ObjectMapper obj = new ObjectMapper();


        Document doc = Document.parse(obj.writeValueAsString(campaign1));


        //DBObject dbObject = (DBObject) com.mongodb.util.JSON.parse(campaign1);
        Object returnObject = mongoTemplate.insert(doc, "test");*/



        return new ResponseEntity<>( new HubResponseWrapper("Server is up and running"), HttpStatus.OK);
    }

    // ResponseEntity
    @RequestMapping(value = SUBMIT_IDEA, produces = "application/json")
    public ResponseEntity<Object> submitIdea( @RequestBody HubRequestWrapper idea) throws Exception {
        //        JSONParser jParser = new JSONParser();
        //        JSONObject jo = (JSONObject) jParser.parse("Sid testing");
        //GsonJsonParser gson = new GsonJsonParser();


        /*Campaign campaign1 = new Campaign("Campaign1", "Sid");

        ObjectMapper obj = new ObjectMapper();


        Document doc = Document.parse(obj.writeValueAsString(campaign1));


        //DBObject dbObject = (DBObject) com.mongodb.util.JSON.parse(campaign1);
        Object returnObject = mongoTemplate.insert(doc, "test");*/

        Object returnData = hubService.addIdea(idea.getData());

        return new ResponseEntity<>( new HubResponseWrapper(returnData), HttpStatus.OK);
    }

}
