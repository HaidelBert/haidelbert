package user

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type RepositoryMongo struct {
	Collection *mgo.Collection
}

func (r RepositoryMongo) FindByUsernameOrEmail(usernameOrEmail string) (*Entity, error) {
	filter := bson.M{
		"$or": []bson.M{
			{"username": usernameOrEmail},
			{"email": usernameOrEmail},
		},
	}
	var entity Entity
	err := r.Collection.Find(filter).One(&entity)
	if err != nil {
		return nil, err
	}

	return &entity, nil
}

func (r RepositoryMongo) FindById(id string) (*Entity, error) {
	var entity Entity
	err := r.Collection.FindId(bson.ObjectIdHex(id)).One(&entity)
	if err != nil {
		return nil, err
	}

	return &entity, nil
}
