package com.innovationshub.webapp.services.impl;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author AJAYLAMBA
 * @since Jun 13, 2020 7:18 PM
 */
@SpringBootTest
public class HubDaoImplTest {

    @Test
    public void testRetrieve() throws Exception {

    }

    @Test
    public void testDelete() throws Exception {
        new HubDaoImpl().deleteAllIdeasForName("AjayIdea");
    }
}
