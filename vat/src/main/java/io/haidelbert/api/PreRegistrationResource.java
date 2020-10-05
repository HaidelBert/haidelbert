package io.haidelbert.api;


import io.haidelbert.domain.CreatePreRegistration;
import io.haidelbert.domain.Service;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RequestScoped
@Path("/vat/api")
public class PreRegistrationResource {

    private Service service;
    private JsonWebToken jwt;

    public PreRegistrationResource(Service service, JsonWebToken jwt) {
        this.service = service;
        this.jwt = jwt;
    }

    @POST
    @Path("/protected/pre-registration")
    @RolesAllowed({"User"})
    public void post(CreatePreRegistration create) {
        service.addPreRegistration(create);
    }
}
