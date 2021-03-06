package com.innovationshub.webapp.controllers;

import static com.innovationshub.webapp.common.IHConstants.APPLICATION_JSON;

import java.util.List;
import java.util.Map;

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
import com.innovationshub.webapp.models.HubError;
import com.innovationshub.webapp.models.HubRequestWrapper;
import com.innovationshub.webapp.models.HubResponseWrapper;
import com.innovationshub.webapp.models.Idea;
import com.innovationshub.webapp.services.api.IHubService;

/**
 * @author Sid
 * @since Jun 08, 2020 23:18
 */
@CrossOrigin(origins = "*")
@RestController
public class LandingController {
    private static final String LANDING_URL = "";
    private static final String SUBMIT_IDEA = "/submit-idea";
    private static final String GET_IDEA = "/get-idea";
    private static final String GET_CAMPAIGN = "/get-campaign";
    private static final String GET_COLLECTION= "/get-collection";
    private static final String GET_FILTERED_COLLECTION= "/get-filtered-collection";
    private static final String EXPORT_CAMPAIGN_IDEAS = "/export-campaign-ideas";
    private static final String SEARCH_IDEAS = "/search-ideas";
    private static final String UPDATE_DOCUMENT_ATTRIBUTE="/update-document-attribute";
    private static final String ADD_DOCUMENT="/add-document";
    private static final String ADD_UPDATE_FILTERS="/add-update-filters";



    @Autowired
    private IHubService hubService;

    @RequestMapping(value = LANDING_URL, produces = APPLICATION_JSON)
    public ResponseEntity<Object> landing() throws Exception {

        return new ResponseEntity<>( new HubResponseWrapper("Server is up and running"), HttpStatus.OK);
    }

    // ResponseEntity
    @RequestMapping(value = SUBMIT_IDEA, produces = APPLICATION_JSON)
    public ResponseEntity<Object> submitIdea( @RequestBody HubRequestWrapper idea) throws Exception {
       Object returnData = hubService.addIdea(idea.getData());

        return new ResponseEntity<>(null != returnData ?
                new HubResponseWrapper(returnData) :
                new HubResponseWrapper(returnData, new HubError(IHConstants.ENTITY_ALREADY_EXIST, IHConstants.ENTITY_ALREADY_EXIST_MESSAGE, null)),
                HttpStatus.OK);
    }

    @RequestMapping(value = GET_IDEA, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> getIdea(@RequestBody Idea inputIdea) throws Exception {

        Object returnData = hubService.getIdea(inputIdea);

        return new ResponseEntity<>(new HubResponseWrapper(returnData), HttpStatus.OK);
    }

    @RequestMapping(value = GET_CAMPAIGN, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> getIdea(@RequestBody Campaign campaignSearchCriteria) throws Exception {

        Object returnData = hubService.getCampaign(campaignSearchCriteria);

        return new ResponseEntity<>(new HubResponseWrapper(returnData), HttpStatus.OK);
    }

    @RequestMapping(value = EXPORT_CAMPAIGN_IDEAS, produces = APPLICATION_JSON, method = RequestMethod.GET)
    public ResponseEntity<Object> exportAllIdeasForCampaign(@RequestParam String campaignName) {
        Object allIdeas = hubService.exportAllIdeasForCampaign(campaignName);
        return new ResponseEntity(new HubResponseWrapper(allIdeas), HttpStatus.OK);
    }

    @ModelAttribute("idea")
    public Idea getIdeaCriteria(){
        Idea idea = new Idea();
        idea.setName("default");;
        return idea;
    }

    @RequestMapping(value=GET_COLLECTION, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> findAllDocuments(@RequestBody String collectionName) throws Exception{
        Object objs=hubService.findAllDocuments(collectionName, null);
        return new ResponseEntity(new HubResponseWrapper(objs), HttpStatus.OK);
    }

    @RequestMapping(value=GET_FILTERED_COLLECTION, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> findFilteredDocuments(@RequestBody HubRequestWrapper data) throws Exception{
        Object filteredDocuments = null;
        if(data!=null && Map.class.isAssignableFrom(data.getData().getClass())){
            Map dataAsMap=(Map)data.getData();
            String collectionName = (String)dataAsMap.get(IHConstants.COLLECTION_NAME);
            filteredDocuments =hubService.findAllDocuments(collectionName, dataAsMap);        }

        return new ResponseEntity(new HubResponseWrapper(filteredDocuments), HttpStatus.OK);
    }

    @RequestMapping(value=SEARCH_IDEAS, produces=APPLICATION_JSON)
    public ResponseEntity<Object> searchIdeas(@RequestBody HubRequestWrapper ideaSearchCriteria) throws  Exception{
        Object ideas = null;
        if(null != ideaSearchCriteria && Map.class.isAssignableFrom(ideaSearchCriteria.getData().getClass())){
         ideas = hubService.findAllDocuments(IHConstants.IDEA_COLLECTION, ideaSearchCriteria.getData());
        }

    return new ResponseEntity<>(new HubResponseWrapper(ideas), HttpStatus.OK);
    }

    @RequestMapping(value = UPDATE_DOCUMENT_ATTRIBUTE, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> updateIdeaDocument(@RequestBody HubRequestWrapper data) throws Exception{
        Object updatedIdea= null;
        if(data!=null && Map.class.isAssignableFrom(data.getData().getClass())){
            Map dataAsMap=(Map)data.getData();
            List<String> attributeNames = (List<String>)dataAsMap.get("attributeNames");
            String collectionName = (String)dataAsMap.get(IHConstants.COLLECTION_NAME);
            updatedIdea = hubService.updateCollectionDocument(dataAsMap.get("data"), attributeNames, collectionName);
        } 
        return new ResponseEntity<>(new HubResponseWrapper(updatedIdea), HttpStatus.OK);
    }

    @RequestMapping(value = ADD_DOCUMENT, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> addDocument(@RequestBody HubRequestWrapper data) throws Exception {
        int addedDocument = 0;
        if (data != null && Map.class.isAssignableFrom(data.getData().getClass())) {
            Map dataAsMap = (Map) data.getData();
            String collectionToInsertData = (String) dataAsMap.get(IHConstants.COLLECTION);
            Object documentsToInsert = dataAsMap.get(IHConstants.DOCUMENTS);

            addedDocument = hubService.addDocument(collectionToInsertData, documentsToInsert);
        }
        return new ResponseEntity<>(addedDocument > 0?
                new HubResponseWrapper(addedDocument) :
                new HubResponseWrapper(addedDocument, new HubError(IHConstants.ERROR_CREATING_ENTITY, IHConstants.ERROR_CREATING_ENTITY_MESSAGE, null)),
                HttpStatus.OK);
    }

    @RequestMapping(value = ADD_UPDATE_FILTERS, produces = APPLICATION_JSON, method =  RequestMethod.POST)
    public ResponseEntity<Object> addUpdateFilters(@RequestBody HubRequestWrapper request) throws Exception{
        if(request!=null && List.class.isAssignableFrom(request.getData().getClass())){
            //Map dataAsMap=(Map)data.getData();
            hubService.addUpdateFilters(request.getData());
        }
        return new ResponseEntity<>(new HubResponseWrapper(null), HttpStatus.OK);
    }
}
