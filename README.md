# AI Thumbnail Generator 🚀

An advanced, high-performance web application that generates professional, high-CTR YouTube thumbnails using multiple AI models and a robust fallback system.

![Thumbnail Preview](https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg)

## ✨ Features

- **Multi-Model AI Pipeline**: Intelligent generation with automatic 3-tier fallbacks:
  1. **Hugging Face Inference API** (Primary)
  2. **Cloudflare Workers AI** (Fallback 1)
  3. **AI Horde** (Fallback 2 - Crowdsourced)
- **User Authentication**: Secure signup and login system using Bcrypt and Express Sessions.
- **Cloudinary Integration**: Automatic high-speed image hosting and optimization.
- **Premium UI/UX**: Built with React 19, Tailwind CSS 4, and Framer Motion for stunning animations and responsiveness.
- **Smooth Interaction**: Integrated Lenis for high-end smooth scrolling experience.

## 🛠️ Technical Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Routing**: [React Router 7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Storage**: [Cloudinary](https://cloudinary.com/)
- **AI SDKs**: `@google/genai`, `@heyputer/puter.js`, and native REST fetches.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- API Keys for Hugging Face and Cloudflare

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ajay-singh18/AI-Thumbnail-Generator.git
   cd AI-Thumbnail-Generator
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=3000
   MONGODB_URL=your_mongodb_url
   SESSION_SECRET=your_secret
   CLOUDINARY_URL=your_cloudinary_url
   CLOUDFLARE_ACCOUNT_ID=your_id
   CLOUDFLARE_API_TOKEN=your_token
   HUGGINGFACE_API_KEY=your_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start Backend Server**
   ```bash
   cd backend
   npm run server
   ```

2. **Start Frontend Dev Server**
   ```bash
   cd frontend
   npm run dev
   ```

## 🤖 AI Logic (The Safe-Fail Pipeline)

The app is designed to never fail an image generation request. The `ThumbnailController` follows this sequence:
1. It attempts **Hugging Face** (SDXL model).
2. If Hugging Face is overloaded, it tries **Cloudflare Workers AI**.
3. If Cloudflare fails, it enters a polling loop with **AI Horde** for 60 seconds.
4. If all fail, the user is notified gracefully.

## 📄 License
This project is licensed under the ISC License.
