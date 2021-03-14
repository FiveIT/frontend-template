.PHONY: \
	build-server build-client build \
	build-dev dev-server dev-client dev \
	test-client test-server test

build-server:
	go build -o ./.netlify/functions/index ./cmd/index

build-client:
	cd web && pnpm run build

build: build-server build-client

build-dev:
	go build -o ./tmp/index ./cmd/index

dev-client:
	cd web && pnpm run dev

dev-server:
	air -c .air.toml

dev: dev-server dev-client

test-client:
	cd web && pnpm t

test-server:
	go test -v ./...

test: test-client test-server
