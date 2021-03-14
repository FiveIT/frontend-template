package server

import (
	"net/http"

	"github.com/FiveIT/template/internal/meta"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/redirect/v2"
)

func New() *fiber.App {
	app := fiber.New()

	// Redirect required for Netlify
	app.Use(redirect.New(redirect.Config{
		Rules: map[string]string{
			"/.netlify/functions/index/*": "/$1",
		},
		StatusCode: http.StatusOK,
	}))

	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: meta.URL(),
	}))

	// Routes go here
	app.Get("/.netlify/functions/index", func(c *fiber.Ctx) error {
		return c.SendString("sarmale cu ghimbir")
	})

	// 404 Not found handler
	app.Use(func(c *fiber.Ctx) error {
		return c.Status(http.StatusNotFound).SendString("nu am gasit acest loc")
	})

	return app
}
