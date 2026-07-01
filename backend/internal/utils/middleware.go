package utils

import (
	"fmt"
	"net/http"
	"os"

	echojwt "github.com/labstack/echo-jwt/v5"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

var JWTConfig = echojwt.Config{
	SigningKey:  []byte(GetSecret()),
	TokenLookup: "cookie:token",
}

var CORSConfig = middleware.CORSConfig{
	AllowOrigins:     []string{"http://localhost:5173", "https://kms.maroisa.com", "http://localhost:3002", "http://192.168.8.143:5173"},
	AllowHeaders:     []string{"*"},
	AllowMethods:     []string{"GET", "POST", "PUT"},
	AllowCredentials: true,
}

var ChiRequestLoggerConfig = middleware.RequestLoggerConfig{
	LogStatus:       true,
	LogURI:          true,
	LogLatency:      true,
	LogMethod:       true,
	LogResponseSize: true,
	LogValuesFunc: func(c *echo.Context, v middleware.RequestLoggerValues) error {
		statusColor := "\033[32m"
		if v.Status >= 400 && v.Status < 500 {
			statusColor = "\033[33m"
		} else if v.Status >= 500 {
			statusColor = "\033[31m"
		}
		resetColor := "\033[0m"

		fmt.Fprintf(os.Stdout, "%s %s - %s%d %s%s in %v (%d Bytes)\n",
			v.Method,
			v.URI,
			statusColor,
			v.Status,
			http.StatusText(v.Status),
			resetColor,
			v.Latency,
			v.ResponseSize,
		)

		return nil
	},
}
