package utils

import (
	"fmt"
	"log"
	"os"
)

func GetDatabaseUrl() string {
	DatabaseUrl := os.Getenv("DATABASE_URL")
	if DatabaseUrl == "" {
		log.Fatalln("DATABASE_URL is not set!")
	}
	return DatabaseUrl
}

func GetPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
		fmt.Printf("PORT is not set! Default to %s \n\n", port)
	}
	return ":" + port
}

func GetSecret() string {
	secret := os.Getenv("SECRET")
	if secret == "" {
		log.Fatalln("SECRET is not set!")
	}
	return secret
}
