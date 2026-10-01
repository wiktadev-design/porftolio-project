# NEURONET // Cyberpunk Creative Portfolio & Journal

Aplikasi web portfolio responsif bertema **Cyberpunk** dengan fitur galeri karya interaktif, jurnal devlog teknikal, dan HUD terminal cybernetic.

Dibangun dengan:
- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **TypeScript**
- **Web Audio API** (Sintesis suara prosedural UI)
- **Lucide React** (Ikonografi)

---

## 🚀 Panduan Deploy ke GitHub & Vercel

Aplikasi ini 100% siap di-upload ke GitHub dan di-deploy ke Vercel tanpa perlu konfigurasi rumit.

### 1. Upload ke GitHub

1. Buka terminal di folder proyek ini.
2. Inisialisasi git (jika belum):
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio cyberpunk siap deploy"
   ```
3. Buat repositori baru di akun [GitHub](https://github.com/new).
4. Hubungkan remote dan push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

---

### 2. Deploy ke Vercel

1. Buka dashboard [Vercel](https://vercel.com) dan login (bisa via akun GitHub Anda).
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repositori GitHub yang baru saja Anda push, lalu klik **"Import"**.
4. Pengaturan Vercel akan otomatis terdeteksi:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build` atau `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Klik **"Deploy"**.
6. Selesai! Dalam beberapa detik situs portfolio Anda sudah aktif dan live dengan HTTPS gratis dari Vercel (misal: `https://portfolio-cyberpunk.vercel.app`).

---

### 3. Menjalankan di Lokal (Development)

```bash
# Install dependensi
npm install

# Jalankan server lokal
npm run dev

# Jalankan build produksi lokal
npm run build
```
