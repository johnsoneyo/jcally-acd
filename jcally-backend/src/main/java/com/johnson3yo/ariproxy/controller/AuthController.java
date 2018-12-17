/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.johnson3yo.ariproxy.controller;

import com.johnson3yo.ariproxy.domainobject.User;
import com.johnson3yo.ariproxy.domainobject.UserActivity;
import com.johnson3yo.ariproxy.service.ARIService;
import com.johnson3yo.ariproxy.service.PublisherService;
import com.johnson3yo.ariproxy.service.UserEvent;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author johnson3yo
 */
@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private ARIService service;    
    @Autowired private PublisherService publisher;
    
    @PostMapping
    public ResponseEntity login(@Valid @RequestBody User user) {
        User u = service.findUserByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (u == null) {
            return new ResponseEntity<String>("user not found", HttpStatus.NOT_FOUND);
        }
       publisher.handleEvent(new UserEvent(this, u, "login in successfull", UserActivity.ActivityType.INFO));
        return new ResponseEntity<User>(u, HttpStatus.OK);
    }

}
