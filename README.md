# Feline Minimalist - Premium Cat Accessories E-commerce

A modern, minimalist e-commerce website for premium cat accessories built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, minimalist design
- 🛒 Interactive shopping cart
- 📱 Fully responsive design
- ⚡ Fast performance with Next.js
- 🎭 Smooth animations with Framer Motion
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
feline-minimalist/
├── app/                   # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
│   └── images/           # Product images
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

## Adding Product Images

Place product images in the `public/images/` directory with the following names:
- `sisal-collection.jpg` - Sisal scratch collection
- `feather-wand.jpg` - Feather wand toys
- `rope-mouse.jpg` - Rope mouse toy
- `cat-beds.jpg` - Modern cat beds
- `cat-house.jpg` - Hideaway cat house
- `smart-ball.jpg` - Smart interactive ball

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework with app directory
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Customization

### Colors
The color palette can be customized in `tailwind.config.js`:
- Neutral tones for modern aesthetic
- Dark grays and blacks for contrast
- Clean whites for backgrounds

### Typography
Font family can be changed in `app/globals.css` and `tailwind.config.js`.

### Animations
Modify animations in the Tailwind config or create custom CSS animations.

## Deployment

The app can be deployed to Vercel, Netlify, or any platform that supports Next.js.

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

## License

MIT License - see LICENSE file for details.
