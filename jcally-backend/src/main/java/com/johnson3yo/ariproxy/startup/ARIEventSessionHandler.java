/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.startup;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.johnson3yo.ariproxy.dto.BridgeDTO;
import com.johnson3yo.ariproxy.dto.BridgeResponse;
import com.johnson3yo.ariproxy.dto.BridgeType;
import com.johnson3yo.ariproxy.service.DefaultAPIService;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Predicate;
import java.util.function.Supplier;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author johnson3yo
 */
@Component
public class ARIEventSessionHandler extends TextWebSocketHandler {

    private Map<String, ManageEvent> eventMap;
    @Autowired
    private DefaultAPIService service;
    @Autowired
    private ChannelQueueService queueLookup;

    @PostConstruct
    public void init() {

        eventMap = new HashMap();
        eventMap.put("StasisStart", (e) -> {
            System.out.println(" -- Entered Stasis Start Mode ---- ");
            String state = (String) e.get("channel").get("state");
            String channelId = (String) e.get("channel").get("id");
            if (state.equals("Ring")) {
                service.answerChannel(channelId);
            }
            BridgeResponse bridge = service.getBridges("holding").
                    stream().findFirst().orElse(null);

            if (bridge == null || bridge.getId() == null) {
                System.out.println("------   No Bridge Configured -----------");
                return ;
            }

            service.addChannelToBridge(bridge.getId(), channelId);
            queueLookup.addToQueue(channelId);
            System.out.println("--------Channel Added To Bridge and Queue -----");
        });
        eventMap.put("ChannelHangupRequest", (e) -> System.out.println(" --- Channel Hangup Request-- --"));
        eventMap.put("StasisEnd", (e) -> System.out.println(" -----Stasis End -------------"));
        eventMap.put("ChannelStateChange", (e) -> System.out.println(" -----Channel State Change -------------"));

        eventMap.put("ChannelEnteredBridge", (e) -> {
            System.out.println(" -----Channel Entered Bridge -------------");

        });

        eventMap.put("ChannelLeftBridge", (e) -> {
            System.out.println(" -----Channel Left Bridge -------------");

        });

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        //System.out.println(message.getPayload());
        Map<String, LinkedHashMap> readValue = mapper.readValue(message.getPayload(), Map.class);
        String foundKey = Checker.of(() -> readValue, "type").
                check(e -> e.containsKey("variable"), "variable").get();

        if (foundKey.equals("type")) {
            eventMap.get(readValue.get(foundKey)).handleEvent(readValue);
        }

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }
   
    //@Scheduled(fixedRate = 5000)
    public void predictiveDialer() {
      
    }

}

@FunctionalInterface
interface ManageEvent {

    void handleEvent(Map<String, LinkedHashMap> readValue);
}

class Checker<T, V> {

    private T map;
    private V key;

    private Checker(final T t, final V v) {
        this.map = t;
        this.key = v;
    }

    static <T, V> Checker<T, V> of(final Supplier<T> supplier, V start) {
        return new Checker<T, V>(supplier.get(), start);
    }

    public Checker<T, V> check(final Predicate<T> consumer, V start) {
        if (consumer.test(map)) {
            this.key = start;
        }
        return this;
    }

    public V get() {
        return key;
    }

}
