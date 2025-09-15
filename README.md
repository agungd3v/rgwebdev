### Setup project

```
create file .env
```

### Environment
```
// development or production for NODE_ENV

NODE_ENV=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_DIALECT=

JWT_SECRET=
```

### Run migration
```
// for migrate all table
npm run database:migrate

// for drop last migration table
npm run database:migrate:undo

// for drop all migration table
npm run database:migrate:undo:all
```

### Run development mode
```
npm install
npm run dev
```

### Run production mode
```
npm install
npm run build
npm run start
```

# Dokumentasi Arsitektur Aplikasi

## 1. Project Structure
Struktur project menggunakan **Next.js App Router** dengan pendekatan modular:

- `app/` routing utama (contoh: `/auth/login`, `/dashboard`, `/notes/[id]`)
- `components/` komponen UI reusable (select, modal, dsb)
- `config/` konfigurasi yang terhubung langsung dengan `.env` file (database, log, dsb)
- `models/` definisi sequelize model (`User`, `Note`, `Comment`, `NoteComment`)
- `database/` konfigurasi koneksi Sequelize ke PostgreSQL
- `repositories/` logic query dan akses data
- `store/` state management

Alur request:
**Frontend (app)** &rarr; **API Route (server)** &rarr; **Repository (logic)** &rarr; **Database (model)**.

---

## 2. Database Structure
Database dirancang dengan 4 tabel inti:

- **users**
  Menyimpan data user (name, email, password).

- **notes**
  Catatan milik user (`userId`, `title`, `description`, `visibility`).

- **comments**
  Komentar dari user (`userId`, `comment`).

- **note_comments**  
  Tabel pivot untuk relasi many-to-many antara notes dan comments.

### Alasan
- Relasi **user &rarr; notes** = one-to-many. User dapat membuat banyak catatan
- Relasi **notes &harr; comments** = many-to-many via `note_comments`. Fleksibel untuk reuse komentar.  
- `visibility` di notes memudahkan filter (misalnya hanya tampilkan note `public`).

---

## 3. Flow Process

### Auth Flow
- Register &rarr; password di-hash (**bcrypt**) &rarr; simpan ke DB.
- Login &rarr; verifikasi password &rarr; hasilkan **JWT** &rarr; disimpan di cookie.

### Dashboard
- Saat buka dashboard, SSR cek cookie JWT.
- Jika valid &rarr; bisa akses semua router dengan path `/dashboard`.
- Jika tidak valid &rarr; redirect ke login.

### Note Flow
- User membuat note &rarr; Mengisi `Title` `Note` `Visibility` dan disimpan ke `notes` dengan `userId`.
- Catatan `public` bisa dilihat semua orang.
- Catatan `private` hanya bisa dilihat oleh user yang miliki link catatan.
- Catatan `hidden` hanya bisa dilihat oleh user pembuat catatan.
- Infinite scroll dipakai untuk load catatan bertahap.

### Comment Flow
- User menambahkan komentar &rarr; Mengisi `Comment` dan disimpan ke `comments` dengan `userId`.
- Relasi ke note dicatat di `note_comments`.
- Saat fetch detail note, komentar ikut dimuat + data user yang komentar.

---

## 4. Rendering Strategy (SSR/CSR/SSG)

- **SSR (Server-Side Rendering)**
  Halaman dinamis: `/dashboard`, `/notes/[id]`, API route.
  Selalu fresh sesuai user login.

- **SSG (Static Site Generation)**
  Halaman publik: `/`, `/auth/login`, `/auth/register`, `/notes`.
  Diprerender untuk kecepatan.

- **CSR (Client-Side Rendering)**
  Interaksi: infinite scroll notes, komentar real-time, state management dengan `Zustand`.

---

## 5. Libraries Used

- **sequelize** dan **sequelize-cli** &rarr; ORM PostgreSQL
- **pg** dan **pg-hstore** &rarr; postgreSQL driver
- **bcrypt** &rarr; hash & verifikasi password
- **jsonwebtoken** &rarr; JWT auth
- **zustand** &rarr; client-side state management
- **react-toastify** &rarr; notifikasi (success/error)
- **react-icons** &rarr; ikon react siap pakai
- **ts-node** &rarr; jalankan TypeScript secara langsung
- **next** (v15.5.3) & **react** (v19.1.0) &rarr; core framework & UI

---

## Ringkasan
- **Struktur modular** &rarr; memisahkan concern (UI, logic, data).
- **Database fleksibel** &rarr; relasi one-to-many + many-to-many.
- **Flow** &rarr; auth &rarr; dashboard &rarr; note &rarr; comment.
- **Optimisasi rendering** &rarr; gabungan SSR, SSG, CSR.
- **Library lengkap** &rarr; mendukung keamanan, performa, & developer experience.