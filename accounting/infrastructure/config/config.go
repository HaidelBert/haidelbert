package config

import (
	"github.com/HaidelBert/accounting/internal/projectpath"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func Load() error {
	env := os.Getenv("ENV")
	var envErr error
	if env != "" {
		envErr = godotenv.Load(projectpath.Root+"/.env." + env)
	} else if fileExists(projectpath.Root+"/.env.local") {
		envErr = godotenv.Load(projectpath.Root+"/.env.local")
	}
	if envErr != nil {
		log.Printf("Error loading .env." + env + " file!")
		return envErr
	}
	envErr = godotenv.Load(projectpath.Root+"/.env")
	if envErr != nil {
		log.Printf("Error loading .env file!")
		return envErr
	}
	return nil
}

func fileExists(filename string) bool {
	info, err := os.Stat(filename)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}