package handler

import (
	"log"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v5"
)

func (s *Server) getPTIK(c *echo.Context) error {
	token, err := echo.ContextGet[*jwt.Token](c, "user")
	if err != nil {
		return echo.ErrUnauthorized
	}

	angkatanParam := c.Param("angkatan")
	var angkatan int

	if angkatanParam != "" && (angkatanParam == "2024" || angkatanParam == "2025") {
		angkatan, err = strconv.Atoi(angkatanParam)
		if err != nil {
			log.Println(err)
			return c.String(http.StatusInternalServerError, "gagal parsing angkatan")
		}
	} else {
		// TODO: Sesuaikan dengan angkatan
		_ = token.Claims.(jwt.MapClaims)
		return c.Redirect(http.StatusFound, "/ptik/2024")
	}

	res, err := s.db.ListPTIK(c.Request().Context(), int16(angkatan))
	if err != nil {
		panic(err)
	}

	return c.JSON(http.StatusOK, res)
}
