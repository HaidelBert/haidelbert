package io.haidelbert.domain;

public class UserContext {
    private final String userId;
    private final String accessToken;

    public UserContext(String userId, String accessToken) {
        this.userId = userId;
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getUserId() {
        return userId;
    }
}
