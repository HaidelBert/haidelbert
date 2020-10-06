package io.haidelbert.domain;

import javax.enterprise.context.RequestScoped;

public class UserContext {
    private final String userId;
    private final String accessToken;

    public UserContext(String userId, String accessToken) {
        this.userId = userId;
        this.accessToken = accessToken;
    }

    public String getAuthHeader() {
        return "Bearer " + this.accessToken;
    }

    public String getUserId() {
        return userId;
    }
}
