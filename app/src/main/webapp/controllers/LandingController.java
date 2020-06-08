package controllers;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Campaign;

/**
 * @author Sid
 * @since Jun 08, 2020 23:18
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LandingController {
    private static final String LANDING_URL = "/test";

    @Autowired
    private MongoTemplate mongoTemplate;

    // ResponseEntity
    @RequestMapping(LANDING_URL)
    public String test() throws Exception {
        //        JSONParser jParser = new JSONParser();
        //        JSONObject jo = (JSONObject) jParser.parse("Sid testing");
        //GsonJsonParser gson = new GsonJsonParser();

        Campaign campaign1 = new Campaign("Campaign1", "Sid");

        ObjectMapper obj = new ObjectMapper();


        Document doc = Document.parse(obj.writeValueAsString(campaign1));


        //DBObject dbObject = (DBObject) com.mongodb.util.JSON.parse(campaign1);
        mongoTemplate.insert(doc, "test");
        return "Testing";
    }

}
