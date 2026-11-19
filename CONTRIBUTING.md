# Panduan Kolaborasi & Git Workflow (LIMS)

Dokumen ini menjadi rujukan standard bagi semua pembangun (*developers*) yang menyumbang kepada repositori **LIMS**.

## 1. Konsep Pembangunan Full-Stack Feature
Setiap tugasan dibangunkan secara *end-to-end* mengikut modul perniagaan. Seorang pembangun boleh mengubah kod di `/backend`, `user-portal`, `admin-portal`, dan `shared-ui` di dalam **satu *branch* yang sama** selagi ia berada di bawah skop tugasan tersebut.

---

## 2. Aliran Kerja Git (Git Workflow)

### Langkah 1: Kemas kini `main` sebelum mula tugasan baharu
Jangan kod terus di dalam *branch* `main`. Sentiasa pastikan kod tempatan anda selari dengan GitHub terlebih dahulu:
```powershell
git checkout main
git pull origin main
```

### Langkah 2: Cipta *Feature Branch*
Gunakan awalan (*prefix*) yang jelas diikuti nama modul:
- `feat/<nama-modul>` — untuk ciri/modul baharu (contoh: `feat/sample-registration`, `feat/user-auth`)
- `fix/<nama-isu>` — untuk pembaikan ralat/pepijat (contoh: `fix/cors-policy`, `fix/login-redirect`)
- `chore/<nama-tugas>` — untuk penyelenggaraan/konfigurasi (contoh: `chore/update-readme`)

```powershell
git checkout -b feat/nama-modul
```

### Langkah 3: Commit & Push Perubahan
Gunakan mesej *commit* yang ringkas dan jelas:
```powershell
git add .
git commit -m "feat: tambah endpoint dan UI pendaftaran sampel"
git push -u origin feat/nama-modul
```

### Langkah 4: Pull Request (PR) & Code Review
1. Buka **Pull Request** di GitHub daripada `feat/nama-modul` ke `main`.
2. Nyatakan ringkasan perubahan (contoh: *Backend API ditambah, UI User & Admin dikemas kini*).
3. Minta sekurang-kurangnya seorang rakan sepasukan menyemak (*review*) sebelum menekan **Merge pull request**.

### Langkah 5: Pembersihan Branch (Cleanup)
Sejurus selepas PR berjaya di-*merge* ke `main`:
1. Klik **Delete branch** di GitHub.
2. Kemas kini repositori tempatan dan padam *branch* lama di komputer anda:
```powershell
git checkout main
git pull origin main
git branch -d feat/nama-modul
```

---

## 3. Amalan Baik Tambahan
- **Jangan *commit* fail rahsia:** Kata laluan pangkalan data, *JWT secret key*, atau sambungan pelayan sebenar hendaklah diletakkan dalam `appsettings.Development.json` (yang sudah diabaikan oleh `.gitignore`).
- **Uji sebelum PR:** Pastikan `dotnet build` (di `/backend`) dan `ng build` (di `/frontend`) berjalan tanpa ralat sebelum membuka Pull Request.