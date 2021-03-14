.PHONY: build-dev dev dev-server dev-client build-prod

build-dev:
	go build -o ./tmp/index ./cmd/index

build-prod:
	go build -o ./.netlify/functions/index ./cmd/index

dev-client:
	cd web && pnpm run dev

dev-server:
	air -c .air.toml

dev: dev-server dev-client
