package handler

import (
	"kms/internal/utils"

	echojwt "github.com/labstack/echo-jwt/v5"
	"github.com/labstack/echo/v5"
)

func (s *Server) Routes() {
	s.e.GET("/", func(c *echo.Context) error {
		return c.JSON(200, map[string]string{
			"message": "OK",
		})
	})

	// auth_handler.go
	s.e.POST("/login", s.login)
	s.e.POST("/reset_password", s.resetPassword)
	s.e.POST("/logout", s.logout)

	protected := s.e.Group("")
	protected.Use(echojwt.WithConfig(utils.JWTConfig))
	protected.GET("/auth", s.getAuth)

	// ptik_handler.go
	protected.GET("/ptik", s.getPTIK)
	protected.GET("/ptik/:angkatan", s.getPTIK)

	// user_handler.go
	protected.GET("/user", s.getUser)
	protected.PATCH("/user", s.changeProfilePicture)

	// tugas_handler.go
	protected.GET("/tugas", s.getTugas)
	protected.GET("/tugas/lama", s.getTugasLama)
	protected.POST("/tugas", s.postTugas)
	protected.PUT("/tugas", s.putTugas)
}
