package io.haidelbert.domain;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
public class Service {

    @Transactional
    public void addPreRegistration(CreatePreRegistration create) {

    }
}
