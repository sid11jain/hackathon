package com.innovationshub.webapp.models;

import org.jetbrains.annotations.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

/**
 * @author Sid
 * @since Jun 18, 2020 21:19
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class HubError {

    @NotNull
    int errorMessageNumber;

    String errorMessage;

    Object errorDetails;

}
