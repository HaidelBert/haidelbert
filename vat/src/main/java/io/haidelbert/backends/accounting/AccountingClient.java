package io.haidelbert.backends.accounting;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/accounting/api")
@RegisterRestClient(configKey = "accountingClient")
@Produces(MediaType.APPLICATION_JSON)
public interface AccountingClient {

    @GET
    @Path("/protected/")
    List<AccountingRecord> listByQuarter(@HeaderParam("Authorization") String bearer, @QueryParam("year") int year, @QueryParam("quarter") Integer quarter);

    @GET
    @Path("/protected/")
    List<AccountingRecord> listByMonth(@HeaderParam("Authorization") String bearer, @QueryParam("year") int year, @QueryParam("month") Integer month);
}
