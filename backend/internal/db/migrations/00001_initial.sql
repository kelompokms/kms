-- +goose Up
CREATE TABLE ptik (
    id SERIAL PRIMARY KEY,
    no_urut SMALLINT NOT NULL,
    nama VARCHAR(64) NOT NULL,
    tempat_lahir VARCHAR(16) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    angkatan SMALLINT NOT NULL,
    password VARCHAR(128),
    pfp VARCHAR(16)
);

CREATE TABLE tugas (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(64) NOT NULL,
    matkul VARCHAR(64) NOT NULL,
    deskripsi TEXT NOT NULL,
    deadline DATE DEFAULT CURRENT_DATE,
    link TEXT
);

-- +goose Down
DROP TABLE tugas;
DROP TABLE ptik;
