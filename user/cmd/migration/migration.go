package main

import (
	"fmt"
	"github.com/HaidelBert/user/cmd/config"
	"github.com/HaidelBert/user/infrastructure/db"
	"gopkg.in/mgo.v2"
)

func main() {
	config.Load()
	session, err := db.Connect()
	defer session.Close()

	if err != nil {
		panic(err)
	}
	usersUsernameErr := session.DB("user").C("users").EnsureIndex(createIndex([]string{"username"}, true))
	if usersUsernameErr != nil {
		fmt.Println("Could not create Index")
	}

	usersEmailErr := session.DB("user").C("users").EnsureIndex(createIndex([]string{"email"}, true))
	if usersEmailErr != nil {
		fmt.Println("Could not create Index")
	}
}

func createIndex(fields []string, unique bool) mgo.Index {
	return mgo.Index{
		Key:    fields,
		Unique: unique,
	}
}
