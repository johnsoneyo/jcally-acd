/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.startup;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author johnson3yo
 */
@Configuration
public class ARIEventRegisterConfiguration {

    @Value("${wsendpoint}")
    private String URL;

    @Bean
    public WebSocketConnectionManager registerWs() {
        WebSocketConnectionManager manager = new WebSocketConnectionManager(client(), handler(), URL);
        manager.setAutoStartup(true);
        return manager;
    }

    @Bean
    public WebSocketClient client() {
        return new StandardWebSocketClient();
    }

    @Bean
    public TextWebSocketHandler handler() {
        return new ARIEventSessionHandler();
    }

}

