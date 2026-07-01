package handler

import (
	"log"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v5"
)

func (s *Server) getUser(c *echo.Context) error {
	token, err := echo.ContextGet[*jwt.Token](c, "user")
	if err != nil {
		log.Println(err)
		return echo.ErrUnauthorized
	}

	claims := token.Claims.(jwt.MapClaims)
	userID := claims["user_id"].(float64)

	user, err := s.db.GetUser(c.Request().Context(), int32(userID))
	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "Gagal mendapatkan data user")
	}

	return c.JSON(http.StatusOK, user)
}

func (s *Server) changeProfilePicture(c *echo.Context) error {
	return nil
}
