package server

import (
	"github.com/FiveIT/template/internal/meta"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func New() *fiber.App {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: meta.URL(),
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("sarmale cu ghimbir")
	})

	return app
}
