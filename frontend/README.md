# LIMS (Laboratory Information Management System)

## Struktur Projek
- `/backend` : .NET 9 Web API (`LIMS.API`)
- `/frontend` : Angular 22 Multi-Project Workspace (`user-portal`, `admin-portal`, `shared-ui`)

## Cara Run Projek (Local Development)

### 1. Backend (.NET API)
cd backend
dotnet restore
dotnet run

### 2. Frontend (Angular)
cd frontend
npm install

# Run User Portal (http://localhost:4200)
ng serve user-portal --port 4200

# Run Admin Portal (Terminal baru - http://localhost:4201)
ng serve admin-portal --port 4201