package io.haidelbert.api.exception;

import io.haidelbert.domain.exception.ConflictException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ConflictExceptionHandler implements ExceptionMapper<ConflictException> {
    @Override
    public Response toResponse(ConflictException e) {
        return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build();
    }
}
