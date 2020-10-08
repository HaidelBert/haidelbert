package io.haidelbert.api;


import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.model.FinancialData;
import io.haidelbert.domain.preRegistration.model.ChangePreRegistration;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.domain.preRegistration.Service;
import io.haidelbert.domain.preRegistration.model.SimulatePreRegistration;
import io.haidelbert.persistence.PreRegistration;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

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
    public PreRegistration post(CreatePreRegistration create) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.addPreRegistration(context, create);
    }

    @GET
    @Path("/protected/pre-registration")
    @RolesAllowed({"User"})
    public List<PreRegistration> get(@QueryParam("year") int year) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.listPreRegistrations(context, year);
    }

    @GET
    @Path("/protected/pre-registration/years")
    @RolesAllowed({"User"})
    public List<Integer> getYears() {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.listDistinctYears(context);
    }

    @PATCH
    @Path("/protected/pre-registration/{id}")
    @RolesAllowed({"User"})
    public void patch(ChangePreRegistration change, @PathParam("id") Long id) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        service.change(context, id, change);
    }

    @POST
    @Path("/protected/pre-registration/simulate")
    @RolesAllowed({"User"})
    public FinancialData post(SimulatePreRegistration simulate) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.simulate(context, simulate);
    }
}