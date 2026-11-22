package main

import (
	"personal-server-backend/controllers"
	"github.com/labstack/echo/v5"
)

func main() {
	e := echo.New()
	controllers.RegisterRoutes(e)

	if err := e.Start(":1323"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}