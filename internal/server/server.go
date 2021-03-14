package server

import (
	"net/http"

	"github.com/FiveIT/template/internal/meta"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func New() *fiber.App {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: meta.URL(),
	}))

	var routes fiber.Router = app
	if meta.IsNetlify {
		routes = app.Group(meta.FunctionsBasePath)
	}

	// Routes go here
	routes.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("sarmale cu ghimbir")
	})

	// 404 Not found handler
	routes.Use(func(c *fiber.Ctx) error {
		return c.Status(http.StatusNotFound).SendString("nu am gasit acest loc")
	})

	return app
}
