package com.innovationshub.webapp.models;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Required;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author Sid
 * @since Jun 12, 2020 19:22
 */
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class HubResponseWrapper {
    final Object data;

    @Builder.Default
    HubError error = null;
}
