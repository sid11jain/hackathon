package com.innovationshub.webapp.services.api;

import com.innovationshub.webapp.models.Campaign;
import org.codehaus.jettison.json.JSONArray;
import com.innovationshub.webapp.models.Idea;

import java.util.List;

/**
 * @author Sid
 * @since Jun 12, 2020 19:43
 */
public interface IHubService {

    /* For now keeping return type for testing */
    Object addIdea(Object idea);

    /**
     * For now passing idea name
     *
     * @param idea
     * @return
     */
    Object getIdea(Idea ideaSearchCriteria);

    /**
     * Rereives a campaign based on campaign name.
     *
     * @param campaignSearchCriteria
     * @return
     */
    Object getCampaign(Campaign campaignSearchCriteria);

    /**
     * Seaches documents based on search criteria passed in filters.
     *
     * @param collectionName
     * @param filters
     * @return
     * @throws Exception
     */
    Object findAllDocuments(String collectionName, Object filters) throws  Exception;

    /**
     * Exports all ideas for a campaign.
     *
     * @param campaignName
     * @return
     */
    List exportAllIdeasForCampaign(String campaignName);

    /**
     * Updates document in the given collection.
     *
     * @param datatypeToUpdate
     * @param attributes
     * @param collectionName
     * @return
     * @throws Exception
     */
    Object updateCollectionDocument(Object datatypeToUpdate, List<String> attributes, String collectionName) throws Exception;

    /**
     * Adds document in the given collection.
     *
     * @param collectionName
     * @param documents
     * @return
     * @throws Exception
     */
    int addDocument(String collectionName, Object documents) throws Exception;
}
