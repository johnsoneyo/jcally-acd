/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.service;

import com.johnson3yo.ariproxy.domainobject.User;
import com.johnson3yo.ariproxy.domainobject.UserActivity.ActivityType;
import org.springframework.context.ApplicationEvent;

/**
 *
 * @author johnson3yo
 */
public class UserEvent extends ApplicationEvent {

    private User user;
    private ActivityType activityType;
    private String operation;

    public UserEvent(Object source) {
        super(source);
    }

    public UserEvent(Object source, User u, String operation, ActivityType activityType) {
        super(source);
        this.user = u;
        this.operation = operation;
        this.activityType = activityType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }
    
    

}
