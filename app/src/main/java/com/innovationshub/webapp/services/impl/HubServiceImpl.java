package com.innovationshub.webapp.services.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.innovationshub.webapp.common.IHConstants;
import com.innovationshub.webapp.models.Campaign;
import com.innovationshub.webapp.models.Idea;
import com.innovationshub.webapp.services.api.IHubDao;
import com.innovationshub.webapp.services.api.IHubService;

/**
 * @author Sid
 * @since Jun 12, 2020 19:43
 */
@Service
public class HubServiceImpl implements IHubService {

    @Autowired
    private IHubDao iHubDao;

    private final Logger LOG;

    HubServiceImpl() {
        LOG = LoggerFactory.getLogger(HubServiceImpl.class);
    }

    @Override
    public Object addIdea(Object idea) {
        Object insertedIdea = null;
        if (null != idea) {
            insertedIdea = iHubDao.addIdea(idea);
        }
        return insertedIdea;
    }

    @Override
    public Object getIdea(@ModelAttribute() Idea idea) {
        if (null != idea) {
                return iHubDao.retrieveIdeaByName(idea.getName());
        }
        return null;
    }

    @Override
    public Object getCampaign(@ModelAttribute() Campaign campaignSearchCriteria) {
        if (null != campaignSearchCriteria) {
            return iHubDao.retrieveCampaignByName(campaignSearchCriteria.getName());
        }
        return null;
    }

    @Override
    public JSONArray findAllDocuments(String collectionName){
        return iHubDao.findAllDocuments(collectionName);
    }

    public JSONArray exportAllIdeasForCampaign(String campaignName) {
        JSONArray ideaData = new HubDaoImpl().getAllIdeasForCampaignName(campaignName);
        //TODO: Could write custom JSON flattener class which would have separate methods to flatten Idea/Campaign etc
        JSONArray exportableDataArr = new JSONArray();
        try {
            for (int idx = 0; idx < ideaData.length(); idx++) {
                JSONObject exportableData = flattenJSONObjectForIdea((JSONObject) ideaData.get(idx));
                exportableDataArr.put(exportableData);
            }
        } catch (Exception e) {
            LOG.error("Error occurred" + e.getMessage());
        }

        return exportableDataArr;
    }

    public JSONObject flattenJSONObjectForIdea(JSONObject ideaData) {
        JSONObject exportableData = new JSONObject();
        try {
            Iterator<String> keys = ideaData.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                if (!IHConstants.CAMPAIGN_VALUES.equals(key)) {
                    //for static fields of idea
                    exportableData.put(key, ideaData.get(key));
                } else {
                    List<Document> list = (ArrayList) ideaData.get(key);
                    for (Document obj : list) {
                        for (Map.Entry<String, Object> entry : obj.entrySet()) {
                            String customFieldKey = entry.getKey();
                            List<Document> valuesList = (ArrayList) entry.getValue();
                            StringBuilder values = new StringBuilder();
                            for (Document valueDoc : valuesList) {
                                String value = (String) valueDoc.get(IHConstants.VALUE_FIELD);
                                values.append(value);
                                values.append(", ");
                            }
                            String finalValue = values.substring(0, values.length() - 2);
                            exportableData.put(customFieldKey, finalValue);
                        }
                    }
                }
            }
        } catch (Exception e) {
            LOG.error("Error occurred while building exportable data" + e.getMessage());
        }
        return exportableData;
    }
}
