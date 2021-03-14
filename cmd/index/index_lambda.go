// +build !dev

package main

import (
	"context"

	"github.com/FiveIT/template/internal/server"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	fiberadapter "github.com/awslabs/aws-lambda-go-api-proxy/fiber"
)

func main() {
	proxy := fiberadapter.New(server.New())

	lambda.Start(func(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
		return proxy.ProxyWithContext(ctx, req)
	})
}
