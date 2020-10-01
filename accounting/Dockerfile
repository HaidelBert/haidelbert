FROM golang:alpine

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Copy the code into the container
COPY . /app
WORKDIR /app

RUN cd /app && go mod download
# Build the application
RUN go build -o /bin/app /app/cmd/server/server.go

# Export necessary port
EXPOSE 9091

# Command to run when starting the container
CMD ["/bin/app"]