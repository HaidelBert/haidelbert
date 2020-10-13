FROM golang:alpine

RUN apk add build-base

ENV GO111MODULE=on \
    CGO_ENABLED=1 \
    GOOS=linux \
    GOARCH=amd64

# Copy the code into the container
COPY . /app
WORKDIR /app

RUN go mod download
# Build the application
RUN go build -tags musl -o /bin/app /app/cmd/server/server.go

# Export necessary port
EXPOSE 9091

# Command to run when starting the container
CMD ["/bin/app"]