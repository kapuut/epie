# Image Placeholder Directory

Letakkan foto-foto di sini dan update `data/content.ts` untuk menggunakannya.

## Cara menambahkan foto:

### How We Met
1. Letakkan foto di `public/images/how-we-met.jpg`
2. Di `data/content.ts`, ubah:
   ```ts
   imageSrc: null
   // menjadi:
   imageSrc: "/images/how-we-met.jpg"
   ```

### Moment Cards
1. Letakkan foto di `public/images/moment-1.jpg` (dst.)
2. Di `data/content.ts`, pada array `momentsData`, ubah:
   ```ts
   imageSrc: null
   // menjadi:
   imageSrc: "/images/moment-1.jpg"
   ```

## Format yang direkomendasikan:
- Format: `.jpg` atau `.webp`
- Rasio: 16:9 untuk foto landscape, atau bebas
- Ukuran: disarankan di bawah 500KB per foto
