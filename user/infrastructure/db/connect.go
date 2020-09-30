package db

import (
	"fmt"
	"gopkg.in/mgo.v2"
	"os"
	"time"
)

func Connect() (*mgo.Session, error) {
	fmt.Println("mongoUrl: " + os.Getenv("mongoUrl"))
	return mgo.DialWithTimeout(os.Getenv("mongoUrl"), time.Second*5)
}
