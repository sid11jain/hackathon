package com.innovationshub.webapp.models;

import org.codehaus.jettison.json.JSONObject;
/**
 * Wrapper class to pass raw JSON object from client side to server side.
 *
 * @author AJAYLAMBA
 * @since Jun 12, 2020 10:06 PM
 */
public class HubJSONWrapper {

    /**
     * This will hold the JSON object passed in from client side.
     *
     */
    private JSONObject payloadData = null;

    public JSONObject getPayloadData() {
        return payloadData;
    }

    public void setPayloadData(JSONObject payloadData) {
        this.payloadData = payloadData;
    }
}
