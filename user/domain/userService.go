package domain



type UserService struct {
	userRepository UserRepository
}

func NewUserService(userRepository UserRepository) UserService {
	return UserService{
		userRepository: userRepository,
	}
}

func (s UserService) GetDetails(id string) (*User, error) {
	user, err := s.userRepository.FindById(id)

	if err != nil {
		return nil, err
	}

	return user, nil
}