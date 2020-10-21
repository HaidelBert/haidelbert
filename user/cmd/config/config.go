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
	} else if fileExists(".env.local"){
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

func fileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}