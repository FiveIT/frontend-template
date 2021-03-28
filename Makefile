.PHONY: \
	build-server build-client build \
	build-dev dev-server dev-client dev \
	test-client test-server test

go_module=github.com/FiveIT/template
functions_base_path=/.netlify/functions/index

build-server:
	go build \
	-ldflags "\
	-X $(go_module)/internal/meta.context=${CONTEXT} \
	-X $(go_module)/internal/meta.url=${URL} \
	-X $(go_module)/internal/meta.netlify=${NETLIFY} \
	-X $(go_module)/internal/meta.FunctionsBasePath=$(functions_base_path) \
	" \
	-o .$(functions_base_path) ./cmd/index

build-client:
	cd web && npm i && npm run build

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
	
application_default_credentials=/root/.config/gcloud/application_default_credentials.json

google_credentials.json:
	if ! [ -f $(application_default_credentials) ]; then \
		gcloud init && \
		gcloud auth application-default login \
	fi && \
	ln -s $(application_default_credentials) /workspace/google_credentials.json
