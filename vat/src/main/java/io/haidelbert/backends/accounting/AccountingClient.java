package io.haidelbert.backends.accounting;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/accounting/api")
@RegisterRestClient(configKey = "accountingClient")
@Produces(MediaType.APPLICATION_JSON)
interface AccountingClient {

    @GET
    @Path("/protected/")
    List<AccountingRecord> listByQuarter(@HeaderParam("Authorization") String authHeader, @QueryParam("year") int year, @QueryParam("quarter") Integer quarter);

    @GET
    @Path("/protected/")
    List<AccountingRecord> listByMonth(@HeaderParam("Authorization") String authHeader, @QueryParam("year") int year, @QueryParam("month") Integer month);

    @GET
    @Path("/internal/")
    List<AccountingRecord> listByQuarterInternal(@HeaderParam("Authorization") String authHeader, @QueryParam("user_id") String userId, @QueryParam("year") int year, @QueryParam("quarter") Integer quarter);

    @GET
    @Path("/internal/")
    List<AccountingRecord> listByMonthInternal(@HeaderParam("Authorization") String authHeader, @QueryParam("user_id") String userId, @QueryParam("year") int year, @QueryParam("month") Integer month);
}
