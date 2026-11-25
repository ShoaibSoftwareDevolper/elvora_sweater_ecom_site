# elvora_sweater_ecom_site

E-commerce storefront for **ELVORA**, a fictional knitwear brand. It is built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

## Features

- Split hero with an opening reveal, where the two images slide in from opposite sides
- "The most popular" and "All products" grids with hover zoom, a wishlist heart and sale badges
- Product detail pages (`/products/[id]`) with:
  - a cropped multi-angle gallery
  - a size picker that marks sold-out sizes
  - add to cart, expandable details and "You may also like"
- Basket and wishlist panels that drop in from the top, plus search and a mobile menu
- Scroll animations built with GSAP and ScrollTrigger:
  - an image swap in the About section
  - an editorial footer gallery and wordmark reveal
- Lenis smooth scrolling, loaded only on desktop pointer devices
- Respects `prefers-reduced-motion`, with focus management and accessible labels

## Tech stack

| Area      | Tool                             |
| --------- | -------------------------------- |
| Framework | Next.js 16, React 19, TypeScript |
| Styling   | Tailwind CSS v4                  |
| Motion    | GSAP, @gsap/react, Lenis         |
| Icons     | lucide-react                     |
| Font      | Outfit (next/font)               |

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Project structure

```
app/                  Root layout, home page, product pages and global styles
app/products/[id]/    Product detail page (statically generated)
components/           UI sections, panels and client interactivity
data/                 Products, sizes and image imports
public/               Image assets
```

## Notes

This is a design mockup. The basket, wishlist and checkout run only in the browser, with no backend, and the brand, products and prices are fictional.

## Author

**Shoaib Hassan**, [@ShoaibSoftwareDevolper](https://github.com/ShoaibSoftwareDevolper)
