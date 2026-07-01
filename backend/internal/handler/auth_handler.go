package handler

import (
	"kms/internal/db"
	"kms/internal/utils"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v5"
	"golang.org/x/crypto/bcrypt"
)

func (s *Server) resetPassword(c *echo.Context) error {
	nim := c.FormValue("nim")
	if nim == "" {
		return c.String(http.StatusBadRequest, "nim tidak boleh kosong!")
	}

	parsedNim, err := utils.ParseNim(nim)
	if err != nil {
		log.Println(err)
		return c.String(http.StatusBadRequest, err.Error())
	}

	tanggalLahir := c.FormValue("tanggal_lahir")
	if tanggalLahir == "" {
		return c.String(http.StatusBadRequest, "tanggal_lahir tidak boleh kosong!")
	}

	parsedTanggalLahir, err := time.Parse("2006-01-02", tanggalLahir)
	if err != nil {
		log.Println(err)
		return c.String(http.StatusBadRequest, "tanggal_lahir tidak valid!")
	}

	password := c.FormValue("password")
	if password == "" {
		return c.String(http.StatusBadRequest, "password tidak boleh kosong!")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return c.String(http.StatusInternalServerError, "gagal mengenkripsi password")
	}

	s.db.UpdatePassword(c.Request().Context(), db.UpdatePasswordParams{
		NoUrut:       parsedNim.NoUrut,
		Angkatan:     parsedNim.Angkatan,
		Password:     pgtype.Text{String: string(hashedPassword), Valid: true},
		TanggalLahir: pgtype.Date{Time: parsedTanggalLahir, Valid: true},
	})

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Sukses mengupdate pasword",
	})
}

func (s *Server) login(c *echo.Context) error {
	nim := c.FormValue("nim")
	if nim == "" {
		return c.String(http.StatusBadRequest, "nim tidak boleh kosong!")
	}

	ParsedNim, err := utils.ParseNim(nim)
	if err != nil {
		log.Println(err)
		return c.String(http.StatusBadRequest, err.Error())
	}

	password := c.FormValue("password")
	if password == "" {
		return c.String(http.StatusBadRequest, "password tidak boleh kosong!")
	}

	user, err := s.db.CheckUser(c.Request().Context(), db.CheckUserParams{
		NoUrut:   ParsedNim.NoUrut,
		Angkatan: ParsedNim.Angkatan,
	})
	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "server gagal memvalidasi password")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password.String), []byte(password))
	if err != nil {
		log.Println(err)
		return c.String(http.StatusBadRequest, "password tidak valid!")
	}

	month := time.Now().Add(time.Hour * 24 * 30)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  user.ID,
		"angkatan": user.Angkatan,
		"exp":      month.Unix(),
	})
	t, err := token.SignedString([]byte(utils.GetSecret()))
	if err != nil {
		return c.String(500, err.Error())
	}

	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    t,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Expires:  month,
		Path:     "/",
	})

	return c.JSON(200, map[string]string{
		"message": "berhasil login!",
	})
}

func (s *Server) logout(c *echo.Context) error {
	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    "",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now(),
		Path:     "/",
	})
	return nil
}

func (s *Server) getAuth(c *echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"message": "Authenticated",
	})
}
