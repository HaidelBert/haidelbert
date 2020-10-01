package validation

type Error struct {
	err    string
	fields map[string][]string
}

func NewError(err string, fields map[string][]string) Error {
	return Error{
		err: err,
		fields: fields,
	}
}

func (e Error) Error() string {
	return e.err
}

func (e Error) Fields() map[string][]string {
	return e.fields
}

func AddFieldError(errors map[string][]string, field string, error string) {
	if errors[field] == nil {
		errors[field] = []string{error}
	} else {
		errors[field] = append(errors[field], error)
	}
}