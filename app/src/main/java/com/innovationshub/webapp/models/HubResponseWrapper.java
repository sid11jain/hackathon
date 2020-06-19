package com.innovationshub.webapp.models;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author Sid
 * @since Jun 12, 2020 19:22
 */
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class HubResponseWrapper {

    final Object data;

    HubError error;
}
