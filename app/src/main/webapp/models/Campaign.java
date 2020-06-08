package models;

import org.springframework.data.annotation.Id;
import org.springframework.data.repository.NoRepositoryBean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Sid
 * @since Jun 08, 2020 23:19
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {

    @Id
    private String campaignName;

    private String campaignType;

}
