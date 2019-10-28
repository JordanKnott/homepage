FROM golang:latest

LABEL maintainer="Jordan Knott <jordan@jordanthedev.com>"

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 9090

# Command to run the executable
CMD ["./main", "serve"]
