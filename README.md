# Valentine's Wish - Next.js Edition

A beautiful Valentine's Day animation project built with **Next.js 14** and **Tailwind CSS**.

[![Author](https://img.shields.io/badge/author-GovindCodes-green)](https://github.com/GovindCodes)

#### [See it Live](https://govindcodes.github.io/ValentineWish/)

## 🚀 Features

- ⚡ Built with Next.js 14 (App Router)
- 🎨 Styled with Tailwind CSS v4
- 🎭 GSAP animations for smooth transitions
- 📱 Fully responsive design
- 🎯 Clean and simple folder structure
- ⚙️ Easy customization via JSON

## 📁 Project Structure

```
├── public/
│   ├── img/              # Images and assets
│   └── customize.json    # Customization data
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles with Tailwind
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main page
│   ├── components/
│   │   └── ValentineAnimation.tsx  # Main animation component
│   └── lib/
│       └── customize.ts  # Customization utilities
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

Edit `public/customize.json` to personalize your Valentine's wish:

```json
{
  "name": "YOUR_NAME",
  "greetingText": "Your greeting message",
  "wishText": "Your wish message",
  "imagePath": "/img/vector.jpg"
}
```

The changes will be reflected immediately in the browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS v4** - Utility-first CSS
- **GSAP** - Animation library
- **TypeScript** - Type safety

## 🤝 Contributing

If you have any idea to make it more interesting, feel free to send a PR, or create an issue for a feature request.

Stay happy and keep the people you care about happy. :)

#### Ownership
The animations used in this Repository were created by Afiur Rahman Fahim (faahim). 😊
