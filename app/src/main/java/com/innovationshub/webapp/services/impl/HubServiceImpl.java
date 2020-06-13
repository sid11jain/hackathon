package com.innovationshub.webapp.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

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

}
