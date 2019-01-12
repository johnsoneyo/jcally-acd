/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.startup;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.johnson3yo.ariproxy.domainobject.CallLog;
import com.johnson3yo.ariproxy.dto.BridgeDTO;
import com.johnson3yo.ariproxy.dto.BridgeResponse;
import com.johnson3yo.ariproxy.dto.BridgeType;
import com.johnson3yo.ariproxy.dto.Channel;
import com.johnson3yo.ariproxy.dto.EndpointResponse;
import com.johnson3yo.ariproxy.dto.PayloadDTO;
import com.johnson3yo.ariproxy.service.DefaultAPIService;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.logging.Level;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    private static final Logger logger = LoggerFactory.getLogger(ARIEventSessionHandler.class);

    private Map<String, ManageEvent> eventMap;
    @Autowired
    private DefaultAPIService service;
    @Autowired
    private ChannelQueueService queueLookup;

    @PostConstruct
    public void init() {

        eventMap = new HashMap();
        eventMap.put("StasisStart", (e) -> {
            try {
                logger.info(" -------- Entered Stasis Start Mode ---- ");

                Map get = e.get("channel");
                String channelAsString = new ObjectMapper().writeValueAsString(get);
                Channel channel = new ObjectMapper().readValue(channelAsString, Channel.class);

                if (channel.getState().equals("Ring")) {
                    service.answerChannel(channel.getId());
                }
                BridgeResponse bridge = service.getBridges("holding").
                        stream().findFirst().orElse(null);

                if (bridge == null || bridge.getId() == null) {
                    logger.info("--------  No Bridge Configured -----------");
                    return;
                }

                String argString = new ObjectMapper().writeValueAsString(e.get("args"));
                String[] args = new ObjectMapper().readValue(argString, String[].class);

                if (args.length == 0) {
                    service.addChannelToBridge(bridge.getId(), channel.getId());
                    queueLookup.addToQueue(channel);
                    logger.info("--------Channel Sent To Holding Bridge and Queue -----");

                } else {
                    BridgeResponse mixingBridge = service.getBridges("mixing").stream().
                            filter(mx -> mx.getChannels().size() == 1).findFirst().orElse(null);

                    if (mixingBridge != null) {
                        service.addChannelToBridge(mixingBridge.getId(), channel.getId());
                    }
                }

            } catch (JsonProcessingException ex) {

            } catch (IOException ex) {

            }
        });
        eventMap.put("ChannelHangupRequest", (e) -> System.out.println(" --- Channel Hangup Request-- --"));
        eventMap.put("StasisEnd", (e) -> System.out.println(" -------- Stasis End -------------"));
        eventMap.put("ChannelStateChange", (e) -> {
            logger.info(" -------- Channel State Change -------------");

        });

        eventMap.put("ChannelEnteredBridge", (e) -> {
            logger.info(" -----Channel Entered Bridge -------------");
        });

        eventMap.put("ChannelLeftBridge", (e) -> {
            logger.info(" -------- Channel Left Bridge -------------");

            System.out.println(e);
            String bridgeType = (String) e.get("bridge").get("bridge_type");
            if (bridgeType.equals("mixing")) {
                Object get = e.get("bridge").get("channels");
                String argString;
                try {
                    argString = new ObjectMapper().writeValueAsString(e.get("bridge").get("channels"));
                    String[] args = new ObjectMapper().readValue(argString, String[].class);
                    if (args.length == 0) {

                        //Terminate and update call-log
                    }

                } catch (JsonProcessingException ex) {

                } catch (IOException ex) {

                }

            }
        });

        eventMap.put("ChannelDestroyed", (e) -> System.out.println("-----Channel Destroyed "));
        eventMap.put("ChannelHold", (e) -> System.out.println("-----Channel Hold "));
        eventMap.put("ChannelUnhold", (e) -> System.out.println("-----Channel Unhold "));

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

    @Scheduled(fixedRate = 20000)
    public void predictiveDialer() {
        List<EndpointResponse> online = service.endpoints().stream().
                filter(e -> e.getState().equals("online"))
                .collect(Collectors.toList());
        //retrieve an endpoint based on the list 
        EndpointResponse found = null;
        if (online.size() < 2) {
            found = online.get(0);
        }

        if (!queueLookup.getQueue().isEmpty()) {

            logger.info("----Endpoint can attend to one channel ----- ");
            Channel channel = queueLookup.getQueue().peek();
            BridgeResponse bridge = service.saveBridge(new BridgeDTO(BridgeType.mixing, String.valueOf(System.currentTimeMillis())));

            String channelId = queueLookup.getQueue().peek().getId();

            service.getBridges("holding").stream().filter(b -> b.getChannels().contains(channelId)).map(f -> f.getId()).peek(System.out::println);

            service.getBridges("holding").stream().filter(b -> b.getChannels().contains(channelId)).forEach(fb -> service.removeChannelFromBridge(fb.getId(), channelId));

            service.
                    originate(new PayloadDTO(found.getTechnology() + "/" + found.getResource(), "hello-world", 10000, "dialed"));

            service.addChannelToBridge(bridge.getId(), channelId);
            queueLookup.getQueue().remove();
            CallLog cLog = new CallLog.CallLogBuilder().build();
            cLog.setChannels(channel.getId());
            cLog.setSource(channel.getCaller().getNumber());
            service.saveCall(cLog);

        }

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
