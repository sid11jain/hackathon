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

    Object getCampaign(Campaign campaignSearchCriteria);

    Object findAllDocuments(String collectionName, Object filters) throws  Exception;

    List exportAllIdeasForCampaign(String campaignName);

    Object updateIdeaDocument(Object idea, List<String> attributes) throws Exception;




}
