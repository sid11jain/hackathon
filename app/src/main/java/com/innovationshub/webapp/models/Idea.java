package com.innovationshub.webapp.models;

import java.io.Serializable;
import java.util.List;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Sid
 * @since Jun 13, 2020 14:52
 */
@Data
@NoArgsConstructor
public class Idea implements Serializable {

    @NotNull
    String name;
//    @NotNull
    String campaignName;

    List<Object> campaignValues;

    String description;
}
