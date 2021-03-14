// +build dev

package main

import "github.com/FiveIT/template/internal/server"

func main() {
	server.New().Listen(":4000")
}
