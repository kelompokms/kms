package utils

import (
	"errors"
	"strconv"
)

type Nim struct {
	Prodi    string
	Angkatan int16
	NoUrut   int16
}

func ParseNim(nim string) (*Nim, error) {
	if len(nim) != 8 {
		return nil, errors.New("NIM tidak valid!")
	}

	Prodi := nim[:3]

	Angkatan, err := strconv.Atoi(nim[3:5])
	if err != nil {
		return nil, err
	}

	NoUrut, err := strconv.Atoi(nim[5:])
	if err != nil {
		return nil, err
	}

	if Prodi != "K35" {
		return nil, errors.New("kode prodi tidak valid!")
	}

	if Angkatan != 24 && Angkatan != 25 {
		return nil, errors.New("angkatan tidak valid!")
	}

	return &Nim{
		Prodi,
		int16(Angkatan) + 2000,
		int16(NoUrut),
	}, nil
}
