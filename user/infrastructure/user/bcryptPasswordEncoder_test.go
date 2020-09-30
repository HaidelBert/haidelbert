package user

import "testing"

func TestBCryptPasswordEncoder(t *testing.T) {
	sut := BcryptPasswordEncoder{}
	hashed, err := sut.Encode("123")
	if err != nil {
		t.Fatalf("Should run without errors")
	}
	if !sut.Compare(*hashed, "123") {
		t.Fatalf("Should run without errors")
	}
}
