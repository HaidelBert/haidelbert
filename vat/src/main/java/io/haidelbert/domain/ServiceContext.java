package io.haidelbert.domain;

import io.haidelbert.config.ServiceCredentials;

import java.util.Base64;

public class ServiceContext implements AuthContext {
    private String authHeader;
    private String userId;

    public ServiceContext() {
    }

    public ServiceContext(String username, String password, String userId) {
        this.authHeader = "Basic " + Base64.getEncoder().encodeToString((username+":"+password).getBytes());
        this.userId = userId;
    }

    public ServiceContext(ServiceCredentials credentials, String userId) {
        this.authHeader = "Basic " + Base64.getEncoder().encodeToString((credentials.getServiceName()+":"+credentials.getServicePassword()).getBytes());
        this.userId = userId;
    }

    @Override
    public String getAuthHeader() {
        return authHeader;
    }

    public void setAuthHeader(String authHeader) {
        this.authHeader = authHeader;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
