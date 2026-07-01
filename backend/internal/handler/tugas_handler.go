package handler

import (
	"kms/internal/db"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v5"
)

func (s *Server) getTugas(c *echo.Context) error {
	tugas, err := s.db.ListTugas(c.Request().Context())
	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "Gagal mendapatkan data tugas")
	}

	return c.JSON(http.StatusOK, tugas)
}

func (s *Server) getTugasLama(c *echo.Context) error {
	tugas, err := s.db.ListTugasLama(c.Request().Context())
	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "Gagal mendapatkan data tugas")
	}
	return c.JSON(http.StatusOK, tugas)
}

func (s *Server) putTugas(c *echo.Context) error {
	idForm := c.FormValue("id")
	if idForm == "" {
		log.Println("id kosong!")
		return c.String(http.StatusBadRequest, "id tidak boleh kosong")
	}

	ID, err := strconv.Atoi(idForm)
	if err != nil {
		return c.String(http.StatusBadRequest, "gagal membaca form ID")
	}

	nama := c.FormValue("nama")
	if nama == "" {
		log.Println("nama kosong!")
		return c.String(http.StatusBadRequest, "nama tugas tidak boleh kosong")
	}

	deskripsi := c.FormValue("deskripsi")
	if deskripsi == "" {
		log.Println("deskripsi kosong!")
		return c.String(http.StatusBadRequest, "deskripsi tidak boleh kosong")
	}

	matkul := c.FormValue("matkul")
	if matkul == "" {
		log.Println("matkul kosong!")
		return c.String(http.StatusBadRequest, "matkul tidak boleh kosong")
	}

	deadline, err := time.Parse("2006-01-02", c.FormValue("deadline"))
	if err != nil {
		return c.String(http.StatusInternalServerError, "gagal memproses tanggal deadline")
	}

	err = s.db.UpdateTugas(c.Request().Context(), db.UpdateTugasParams{
		ID:        int32(ID),
		Nama:      nama,
		Matkul:    matkul,
		Deskripsi: deskripsi,
		Deadline:  pgtype.Date{Valid: true, Time: deadline},
		Link:      pgtype.Text{String: c.FormValue("link"), Valid: true},
	})

	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "gagal mengupdate tugas")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "sukses mengupdate tugas " + nama,
	})
}

func (s *Server) postTugas(c *echo.Context) error {
	nama := c.FormValue("nama")
	if nama == "" {
		log.Println("nama kosong!")
		return c.String(http.StatusBadRequest, "nama tugas tidak boleh kosong")
	}

	deskripsi := c.FormValue("deskripsi")
	if deskripsi == "" {
		log.Println("deskripsi kosong!")
		return c.String(http.StatusBadRequest, "deskripsi tidak boleh kosong")
	}

	matkul := c.FormValue("matkul")
	if matkul == "" {
		log.Println("matkul kosong!")
		return c.String(http.StatusBadRequest, "matkul tidak boleh kosong")
	}

	deadline, err := time.Parse("2006-01-02", c.FormValue("deadline"))
	if err != nil {
		return c.String(http.StatusInternalServerError, "gagal memproses tanggal deadline")
	}

	err = s.db.CreateTugas(c.Request().Context(), db.CreateTugasParams{
		Nama:      nama,
		Matkul:    matkul,
		Deskripsi: deskripsi,
		Deadline:  pgtype.Date{Valid: true, Time: deadline},
		Link:      pgtype.Text{Valid: true, String: c.FormValue("link")},
	})

	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "gagal membuat tugas")
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "sukses membuat tugas baru!",
	})
}
