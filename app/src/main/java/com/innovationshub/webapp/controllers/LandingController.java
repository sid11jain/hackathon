package com.innovationshub.webapp.controllers;

import java.util.List;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innovationshub.webapp.common.IHConstants;
import com.innovationshub.webapp.models.Campaign;
import com.innovationshub.webapp.models.HubRequestWrapper;
import com.innovationshub.webapp.models.HubResponseWrapper;
import com.innovationshub.webapp.models.Idea;
import com.innovationshub.webapp.services.api.IHubService;

/**
 * @author Sid
 * @since Jun 08, 2020 23:18
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LandingController {
    private static final String LANDING_URL = "";
    private static final String SUBMIT_IDEA = "/submit-idea";
    private static final String GET_IDEA = "/get-idea";
    private static final String GET_CAMPAIGN = "/get-campaign";
    private static final String GET_COLLECTION= "/get-collection";
    private static final String EXPORT_CAMPAIGN_IDEAS = "/export-campaign-ideas";

    @Autowired
    private IHubService hubService;

    @RequestMapping(value = LANDING_URL, produces = "application/json")
    public ResponseEntity<Object> landing() throws Exception {

        return new ResponseEntity<>( new HubResponseWrapper("Server is up and running"), HttpStatus.OK);
    }

    // ResponseEntity
    @RequestMapping(value = SUBMIT_IDEA, produces = "application/json")
    public ResponseEntity<Object> submitIdea( @RequestBody HubRequestWrapper idea) throws Exception {
       Object returnData = hubService.addIdea(idea.getData());

        return new ResponseEntity<>( new HubResponseWrapper(returnData), HttpStatus.OK);
    }

    @RequestMapping(value = GET_IDEA, produces = "application/json", method =  RequestMethod.POST)
    public ResponseEntity<Object> getIdea(@RequestBody Idea inputIdea) throws Exception {

        Object returnData = hubService.getIdea(inputIdea);

        return new ResponseEntity<>(new HubResponseWrapper(returnData), HttpStatus.OK);
    }

    @RequestMapping(value = GET_CAMPAIGN, produces = "application/json", method =  RequestMethod.POST)
    public ResponseEntity<Object> getIdea(@RequestBody Campaign campaignSearchCriteria) throws Exception {

        Object returnData = hubService.getCampaign(campaignSearchCriteria);

        return new ResponseEntity<>(new HubResponseWrapper(returnData), HttpStatus.OK);
    }

    @RequestMapping(value = EXPORT_CAMPAIGN_IDEAS, method = RequestMethod.GET)
    public ResponseEntity<Object> exportAllIdeasForCampaign(@RequestParam String campaignName) {
        Object allIdeas = hubService.exportAllIdeasForCampaign(campaignName);
        return new ResponseEntity(new HubResponseWrapper(allIdeas.toString()), HttpStatus.OK);
    }

    @ModelAttribute("idea")
    public Idea getIdeaCriteria(){
        Idea idea = new Idea();
        idea.setName("default");;
        return idea;
    }

    @RequestMapping(value=GET_COLLECTION, produces = "application/json", method =  RequestMethod.POST)
    public ResponseEntity<Object> findAllDocuments(@RequestBody String collectionName) throws Exception{
        Object objs=hubService.findAllDocuments(collectionName);
//        JSONObject obj = new JSONObject();
//        obj.put(IHConstants.CAMPAIGN_COLLECTION, objs);
        return new ResponseEntity<>(new HubResponseWrapper(objs), HttpStatus.OK);
    }

}
