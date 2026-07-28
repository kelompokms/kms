package handler

import (
	"io"
	"kms/internal/db"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"
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
	token, err := echo.ContextGet[*jwt.Token](c, "user")
	if err != nil {
		log.Println(err)
		return echo.ErrUnauthorized
	}

	claims := token.Claims.(jwt.MapClaims)
	userID := claims["user_id"].(float64)

	file, err := c.FormFile("pfp")
	if err != nil {
		log.Println(err)
		return c.String(http.StatusBadRequest, err.Error())
	}

	src, err := file.Open()
	if err != nil {
		log.Println(err)
		return c.String(http.StatusBadRequest, err.Error())
	}

	defer src.Close()

	if err := os.MkdirAll("uploads", 0755); err != nil {
		log.Println(err)
		return err
	}
	dst, err := os.Create(filepath.Join("uploads", file.Filename))
	if err != nil {
		log.Println(err)
		return err
	}

	if _, err = io.Copy(dst, src); err != nil {
		log.Println(err)
		return err
	}

	err = s.db.UpdatePfp(c.Request().Context(), db.UpdatePfpParams{
		Pfp: pgtype.Text{String: file.Filename, Valid: true},
		ID:  int32(userID),
	})

	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "Gagal mengupdate profile.")
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"filename": file.Filename,
	})
}
