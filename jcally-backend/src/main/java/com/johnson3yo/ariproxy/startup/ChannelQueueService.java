/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.startup;

import java.util.LinkedList;
import java.util.Queue;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 * @author johnson3yo
 */
@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class ChannelQueueService {

    private Queue<String> queue;

    @PostConstruct
    public void initQueue() {
        queue = new LinkedList<>();
    }

    public void addToQueue(String channelId) {
        queue.add(channelId);
    }
}
