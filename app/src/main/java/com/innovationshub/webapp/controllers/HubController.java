package com.innovationshub.webapp.controllers;

import org.codehaus.jettison.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.innovationshub.webapp.models.HubJSONWrapper;
import com.innovationshub.webapp.services.IHubDao;
import com.innovationshub.webapp.services.Impl.HubDaoImpl;

/**
 * @author AJAYLAMBA
 * @since Jun 12, 2020 10:05 PM
 */
//@RestController
@RequestMapping("/hub")
public class HubController {

    @RequestMapping(value = "/addIdea", method = RequestMethod.POST)
    public void addIdea(@RequestBody HubJSONWrapper payload) {
        JSONObject payloadData = payload.getPayloadData();
        IHubDao dao = new HubDaoImpl();
        dao.addIdea(payloadData);
    }

    @RequestMapping(value = "/print", method = RequestMethod.POST)
    public void print(@RequestBody HubJSONWrapper payload) {
        JSONObject payloadData = payload.getPayloadData();
        IHubDao dao = new HubDaoImpl();
        dao.printAll();
    }
}
