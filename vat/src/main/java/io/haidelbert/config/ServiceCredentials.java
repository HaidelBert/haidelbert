package io.haidelbert.config;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ServiceCredentials {
    String serviceName;
    String servicePassword;

    public ServiceCredentials(@ConfigProperty(name = "vat.accounting.credentials.username") String serviceName, @ConfigProperty(name = "vat.accounting.credentials.password") String servicePassword) {
        this.serviceName = serviceName;
        this.servicePassword = servicePassword;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServicePassword() {
        return servicePassword;
    }

    public void setServicePassword(String servicePassword) {
        this.servicePassword = servicePassword;
    }
}
