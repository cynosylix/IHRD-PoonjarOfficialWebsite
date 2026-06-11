All site images are stored locally under public/images/.

Do not hot-link cep.ac.in in the app — every photo is served from /images/...

To refresh from production (while cep.ac.in is still available):
  npm run sync:images

JPEG/WebP are saved at high quality (93% JPEG, 4:4:4 chroma) for clarity.

To check that every referenced image exists locally:
  npm run verify:images

Build fails if any cep.ac.in image URL is used in app source instead of /images/...

Folders:
  facilities/   — facility page photos
  pages/        — tab hero banners
  community/    — alumni, IEEE, IEDC, NSS; senate/ member portraits
  departments/  — HOD portraits for department cards
  faculty/      — all department staff portraits (by dept slug + order)
  slides/       — homepage gallery
  events/       — announcement / event photos
  logo.webp, collageOutDoor-2.webp — branding and hero

Build runs verify:images automatically (prebuild).
