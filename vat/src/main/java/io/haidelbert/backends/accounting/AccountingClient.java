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
    @Path("/internal/")
    List<AccountingRecord> listByQuarterInternal(@HeaderParam("Authorization") String authHeader, @QueryParam("user_id") String userId, @QueryParam("year") int year, @QueryParam("quarter") Integer quarter);

    @GET
    @Path("/internal/")
    List<AccountingRecord> listByMonthInternal(@HeaderParam("Authorization") String authHeader, @QueryParam("user_id") String userId, @QueryParam("year") int year, @QueryParam("month") Integer month);
}
