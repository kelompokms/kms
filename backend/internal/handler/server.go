package handler

import (
	"kms/internal/db"
	"kms/internal/utils"

	"github.com/labstack/echo/v5"
)

type Server struct {
	e  *echo.Echo
	db *db.Queries
}

func NewServer(db *db.Queries) *Server {
	return &Server{
		e:  echo.New(),
		db: db,
	}
}

func (s *Server) Start() {
	s.Routes()

	port := utils.GetPort()

	err := s.e.Start(port)
	if err != nil {
		s.e.Logger.Error("Failed to start server", "error", err)
	}
}

func (s *Server) Use(middleware echo.MiddlewareFunc) {
	s.e.Use(middleware)
}
