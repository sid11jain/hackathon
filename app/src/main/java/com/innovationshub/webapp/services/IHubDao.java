package com.innovationshub.webapp.services;

import org.codehaus.jettison.json.JSONObject;

/**
 * @author AJAYLAMBA
 * @since Jun 12, 2020 10:01 PM
 */
public interface IHubDao {

    public void addIdea(JSONObject idea);

    public void printAll();

}
