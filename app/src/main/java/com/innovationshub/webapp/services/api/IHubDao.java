package com.innovationshub.webapp.services.api;

import java.util.List;

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

    List findAllDocuments(String collectionName, Object filters) throws Exception;
    List getAllIdeasForCampaignName(String campaignName);

    /**
     * Deletes all the ideas which have given name.
     *
     * @param ideaName
     * @return
     */
    public long deleteAllIdeasForName(String ideaName);

    Object updateIdeaDocument(Object idea, List<String> attribute) throws Exception;

    /** This is an unchecked method which will insert the document irrespective of fact whether the document already exists in the collection or not.
     * Please use it carefully.
     *
     * @param collectionName
     * @param document
     * @return
     * @throws Exception
     */
    int addDocument(String collectionName, Object documents) throws Exception;


}
