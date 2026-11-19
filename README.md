# LIMS (Laboratory Information Management System)

Sistem pengurusan makmal (LIMS) berasaskan arkitektur Monorepo yang menggabungkan **.NET 9 Web API** dan **Angular 22 Multi-Project Workspace**.

## Prasyarat Perisian (Tech Stack)
Pastikan persekitaran pembangunan tempatan mempunyai versi perisian yang serasi:
- **Node.js:** `v24.x` (LTS)
- **Angular CLI:** `v22.x`
- **.NET SDK:** `9.0.x`
- **Git:** `v2.x`

## Struktur Projek
```text
LIMS/
├── backend/                  # .NET 9 Web API (LIMS.API)
├── frontend/                 # Angular 22 Workspace
│   └── projects/
│       ├── user-portal/      # Portal utama pengguna makmal
│       ├── admin-portal/     # Portal pentadbiran & konfigurasi sistem
│       └── shared-ui/        # Komponen, model, dan servis guna sama
├── CONTRIBUTING.md           # Panduan Git Workflow & SOP pasukan
└── README.md                 # Dokumentasi utama projek
```

---

## First-Time Setup (Selepas `git clone`)

Selepas melakukan `git clone <repo-url>`, jalankan pemasangan pakej berikut di komputer masing-masing:

**1. Backend (.NET 9)**
```powershell
cd backend
dotnet restore
```

**2. Frontend (Angular 22)**
```powershell
cd frontend
npm install
```

---

## Cara Run Projek (Local Development)

Jalankan ketiga-tiga servis secara serentak menggunakan terminal berasingan:

* **Terminal 1 — Backend API:**
  ```powershell
  cd backend
  dotnet run
  ```

* **Terminal 2 — User Portal (`http://localhost:4200`):**
  ```powershell
  cd frontend
  ng serve user-portal --port 4200
  ```

* **Terminal 3 — Admin Portal (`http://localhost:4201`):**
  ```powershell
  cd frontend
  ng serve admin-portal --port 4201
  ```

---

## Panduan Kolaborasi
Sila rujuk fail [CONTRIBUTING.md](./CONTRIBUTING.md) untuk peraturan *branching*, format *commit*, dan proses *Pull Request*.