package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func Load() {
	env := os.Getenv("ENV")
	var envErr error
	if env != "" {
		envErr = godotenv.Load(".env." + env)
	} else {
		envErr = godotenv.Load(".env.local")
	}
	if envErr != nil {
		log.Fatal("Error loading .env" + env + " file")
	}
	envErr = godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}
}
