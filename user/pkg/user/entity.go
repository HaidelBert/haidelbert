package user

import (
	"gopkg.in/mgo.v2/bson"
)

type Entity struct {
	Id bson.ObjectId `json:"id" bson:"_id"`
	Username string `json:"username" bson:"username"`
	Email string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
}