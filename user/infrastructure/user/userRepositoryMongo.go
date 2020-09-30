package user

import (
	"github.com/HaidelBert/user/domain"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type RepositoryMongo struct {
	Collection *mgo.Collection
}

func (r RepositoryMongo) FindByUsernameOrEmail(usernameOrEmail string) (*domain.User, error) {
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

	return fromEntity(entity), nil
}

func (r RepositoryMongo) FindById(id string) (*domain.User, error) {
	var entity Entity
	err := r.Collection.FindId(bson.ObjectIdHex(id)).One(&entity)
	if err != nil {
		return nil, err
	}

	return fromEntity(entity), nil
}

func fromEntity(entity Entity) *domain.User {
	return &domain.User{
		ID: entity.Id.Hex(),
		Username: entity.Username,
		Email: entity.Email,
		Password: entity.Password,
	}
}
