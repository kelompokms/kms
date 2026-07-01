package main

import (
	"context"
	"embed"
	"kms/internal/db"
	"kms/internal/handler"
	"kms/internal/utils"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/labstack/echo/v5/middleware"
	"github.com/pressly/goose/v3"
)

//go:embed internal/db/migrations/*.sql
var embedMigrations embed.FS

func main() {
	databaseUrl := utils.GetDatabaseUrl()
	_ = utils.GetSecret()

	pool, err := pgxpool.New(context.Background(), databaseUrl)
	if err != nil {
		log.Fatalln(err)
	}

	queries := db.New(pool)

	goose.SetBaseFS(embedMigrations)
	if err := goose.SetDialect("postgres"); err != nil {
		panic(err)
	}

	if err := goose.Up(stdlib.OpenDBFromPool(pool), "internal/db/migrations"); err != nil {
		panic(err)
	}

	server := handler.NewServer(queries)

	server.Use(middleware.RequestLoggerWithConfig(utils.ChiRequestLoggerConfig))
	server.Use(middleware.Recover())
	server.Use(middleware.CORSWithConfig(utils.CORSConfig))

	server.Start()
}
