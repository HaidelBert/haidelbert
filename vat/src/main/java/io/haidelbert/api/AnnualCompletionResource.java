package io.haidelbert.api;

import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.annualCompletion.Service;
import io.haidelbert.domain.annualCompletion.model.ChangeAnnualCompletion;
import io.haidelbert.domain.annualCompletion.model.CreateAnnualCompletion;
import io.haidelbert.domain.annualCompletion.model.SimulatedAnnualCompletion;
import io.haidelbert.domain.model.FinancialData;
import io.haidelbert.persistence.AnnualCompletion;
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
public class AnnualCompletionResource {

    private final Service service;
    private final JsonWebToken jwt;

    public AnnualCompletionResource(Service service, JsonWebToken jwt) {
        this.service = service;
        this.jwt = jwt;
    }

    @GET
    @Path("/protected/annual-completion")
    @RolesAllowed({"User"})
    public List<AnnualCompletion> get() {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.list(context);
    }

    @POST
    @Path("/protected/annual-completion")
    @RolesAllowed({"User"})
    public AnnualCompletion post(CreateAnnualCompletion create) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.add(context, create);
    }

    @POST
    @Path("/protected/annual-completion/simulate")
    @RolesAllowed({"User"})
    public FinancialData simulate(CreateAnnualCompletion create, @QueryParam("year") Integer year) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        return service.simulate(context, year);
    }

    @PATCH
    @Path("/protected/annual-completion/{id}")
    @RolesAllowed({"User"})
    public void patch(ChangeAnnualCompletion change, @PathParam("id") Long id) {
        var context = new UserContext(jwt.getName(), jwt.getRawToken());
        service.change(context, id, change);
    }
}
