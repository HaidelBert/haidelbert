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
		log.Print("Try to load " + ".env." + env + " file!")
		envErr = godotenv.Load(".env." + env)
	} else {
		log.Print("Try to load " + ".env.local file!")
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
