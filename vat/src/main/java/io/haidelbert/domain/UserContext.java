package io.haidelbert.domain;

public class UserContext implements AuthContext {
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
