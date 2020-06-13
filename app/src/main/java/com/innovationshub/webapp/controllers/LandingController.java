package com.innovationshub.webapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    @ModelAttribute("idea")
    public Idea getIdeaCriteria(){
        Idea idea = new Idea();
        idea.setName("default");;
        return idea;
    }

}
