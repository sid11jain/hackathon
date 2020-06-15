package com.innovationshub.webapp.services.api;

import java.util.List;

import org.codehaus.jettison.json.JSONArray;

/**
 * @author AJAYLAMBA
 * @since Jun 12, 2020 10:01 PM
 */
public interface IHubDao {

    /**
     * Adds an idea and returns the object inserted.
     *
     * @param idea
     * @return
     */
    public Object addIdea(Object idea);

    public void printAll();

    /**
     * Retrieves an idea based on idea name
     *
     * @param ideaName
     * @return
     */
    public Object retrieveIdeaByName(String ideaName);

    /**
     * Retrieves campaign based on campaign name.
     *
     * @param campaignName
     * @return
     */
    public Object retrieveCampaignByName(String campaignName);

    List<Object> findAllDocuments(String collectionName);
    public JSONArray getAllIdeasForCampaignName(String campaignName);

    /**
     * Deletes all the ideas which have given name.
     *
     * @param ideaName
     * @return
     */
    public long deleteAllIdeasForName(String ideaName);

}
