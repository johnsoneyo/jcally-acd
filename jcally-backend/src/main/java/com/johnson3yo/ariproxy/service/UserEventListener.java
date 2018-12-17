/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.service;

import com.johnson3yo.ariproxy.domainobject.UserActivity;
import com.johnson3yo.ariproxy.repository.UserActivityRepository;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 *
 * @author johnson3yo
 */
@Component
public class UserEventListener {

    @Autowired
    private UserActivityRepository repo;

    @EventListener
    public void loggingUserEvent(UserEvent ue) {
        UserActivity ua = new UserActivity.UserActivityBuilder().
                setId(Integer.SIZE).setSummary(ue.getOperation()).
                setActivityType(ue.getActivityType()).setTimeCreated(new Date()).setUserId(ue.getUser()).build();
        repo.save(ua);
    }

}
