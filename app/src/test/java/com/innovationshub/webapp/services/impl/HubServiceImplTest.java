package com.innovationshub.webapp.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.innovationshub.webapp.common.IHConstants;
import com.innovationshub.webapp.models.Campaign;
import com.innovationshub.webapp.services.api.IHubDao;

/**
 * Tests {@link HubServiceImpl} class.
 *
 * @author AJAYLAMBA
 * @since Jun 14, 2020 8:23 PM
 */
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class HubServiceImplTest {

    @InjectMocks
    private HubServiceImpl hubService;
    private IHubDao iHubDao = Mockito.mock(IHubDao.class);


    @Test
    public void testAddIdea() {
        Object idea = new Object();
        Object ideaToSubmit = new Object();
        Mockito.when(iHubDao.addIdea(Mockito.any())).thenReturn(idea);
        Object returnedIdea = hubService.addIdea(ideaToSubmit);
        Assert.assertEquals(idea, returnedIdea);
        Mockito.verify(iHubDao, Mockito.times(1)).addIdea(Mockito.any());
    }

    @Test
    public void testFindAllDocuments() throws Exception {
        List returnedDoc = new ArrayList<>();
        Object filters = new Object();
        String collectionName = IHConstants.IDEA_COLLECTION;
        Mockito.when(iHubDao.findAllDocuments(collectionName, filters)).thenReturn(returnedDoc);
        Object output = hubService.findAllDocuments(collectionName, filters);
        Assert.assertEquals(returnedDoc, output);
        Mockito.verify(iHubDao, Mockito.times(1)).findAllDocuments(collectionName, filters);
    }

    @Test
    public void testGetCampaign() {
        String campaignName = "Demo";
        Campaign campaignSearchCriteria = new Campaign();
        campaignSearchCriteria.setName(campaignName);
        Campaign returnedDoc = new Campaign();
        returnedDoc.setName(campaignName);
        Mockito.when(iHubDao.retrieveCampaignByName(Mockito.anyString())).thenReturn(returnedDoc);
        Campaign campaign = (Campaign) hubService.getCampaign(campaignSearchCriteria);
        Assert.assertNotNull(campaign);
        Assert.assertEquals(campaignName, campaign.getName());
        Mockito.verify(iHubDao, Mockito.times(1)).retrieveCampaignByName(campaignName);
    }
}
