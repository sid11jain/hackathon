package com.innovationshub.webapp.services.api;

import com.innovationshub.webapp.models.Idea;

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
    Object getIdea(Idea idea);


}
