FROM ubuntu

SHELL ["/bin/bash", "-c"]

# To be able to use apt-add-repository
RUN apt-get update -y && apt-get install software-properties-common curl wget make -y

RUN \
  # Add Google Cloud SDK apt repository
  echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" \
  | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
  && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg \
  | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - \
  # Add GH CLI apt repository
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0 \
  && apt-add-repository https://cli.github.com/packages -y

# Install packages
RUN \
  apt-get update -y \
  && apt-get upgrade -y \
  && apt-get install google-cloud-sdk gh -y

# Download all packages here
WORKDIR /deps

RUN touch /root/.bashrc

# Install the AWS CLI
# RUN wget https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip \
  # && unzip awscli-exe-linux-x86_64.zip \
  # && ./aws/install

# Install Go and required tooling
ARG GO_VERSION=1.16.2
ENV PATH /usr/local/go/bin:$PATH
RUN wget https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz \
  && tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
RUN go get golang.org/x/tools/gopls@latest
RUN go install github.com/go-delve/delve/cmd/dlv@latest
RUN go get github.com/uudashr/gopkgs/cmd/gopkgs@v2
RUN go get github.com/ramya-rao-a/go-outline
RUN go get github.com/fatih/gomodifytags
RUN go get github.com/josharian/impl
RUN go get github.com/cweill/gotests/...
RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.37.1
RUN go get -u github.com/cosmtrek/air
RUN go get golang.org/x/tools/cmd/goimports
ENV PATH /root/go/bin:${PATH}

# Install NVM, Node, and pnpm 
ARG NODE_VERSION=15
ENV NVM_DIR /root/.nvm
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash \
  && . ${NVM_DIR}/nvm.sh \
  && nvm install ${NODE_VERSION} \
  && npm i -g npm \
  && npm i -g pnpm

RUN alias npm=pnpm
RUN alias npx=pnpx

# Install Docker CE CLI
# RUN apt-get update \
  # && apt-get install -y apt-transport-https ca-certificates curl gnupg2 lsb-release \
  # && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null \
  # && echo "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list \
  # && apt-get update \
  # && apt-get install -y docker-ce-cli

WORKDIR /workspace
