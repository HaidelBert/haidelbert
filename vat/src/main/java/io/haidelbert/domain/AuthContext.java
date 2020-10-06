package io.haidelbert.domain;

public interface AuthContext {
    public String getAuthHeader();

    public String getUserId();
}
