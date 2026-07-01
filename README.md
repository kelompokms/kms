## KMS

### Requirement
- Go 1.24
  - [sqlc](https://docs.sqlc.dev/en/stable/overview/install.html)
  - [air](https://github.com/air-verse/air) (optional for hot reloading)

- npm or pnpm

### Setup

1. clone the project 
```bash
git clone https://github.com/maroisa/go-maro.git && cd go-maro

# -- backend --
2. Download the required dependencies
go mod download

# -- frontend --
cd web
pnpm install # or npm install
```

2. Frontend only development
```bash
cd web
pnpm dev
```

3. Fullstack development
```bash
cd web
pnpm build

cd ..
go run cmd/main.go
# or if you have air
air
```
