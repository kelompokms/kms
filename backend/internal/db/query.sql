-- name: ListPTIK :many
select id, CONCAT('K35', RIGHT(angkatan::text, 2), LPAD(no_urut::text, 3, '0')) as nim, nama, tempat_lahir, tanggal_lahir, angkatan from ptik where angkatan = $1 order by no_urut;

-- name: UpdatePassword :exec
update ptik set password = $1 where no_urut = $2 and angkatan = $3 and tanggal_lahir = $4;

-- name: CheckUser :one
select id, angkatan, password from ptik where no_urut = $1 and angkatan = $2;

-- name: GetUser :one
select id, CONCAT('K35', RIGHT(angkatan::text, 2), LPAD(no_urut::text, 3, '0')) as nim, nama, tempat_lahir, tanggal_lahir, angkatan, pfp from ptik where id = $1;

-- name: ListTugas :many
select * from tugas where deadline >= CURRENT_DATE ORDER BY deadline;

-- name: ListTugasLama :many
select * from tugas where deadline < CURRENT_DATE ORDER BY deadline;

-- name: GetTugas :one
select * from tugas where id = $1;

-- name: UpdateTugas :exec
update tugas set nama = $2, matkul = $3, deskripsi = $4, deadline = $5, link = $6 where id = $1;

-- name: CreateTugas :exec
insert into tugas (nama, matkul, deskripsi, deadline, link) values ($1, $2, $3, $4, $5);
