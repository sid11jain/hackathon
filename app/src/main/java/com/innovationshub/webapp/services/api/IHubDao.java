package com.innovationshub.webapp.services.api;

import org.codehaus.jettison.json.JSONObject;

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

}
