# 🎬 Movies MH24

A comprehensive movie discovery platform built with Next.js, TypeScript, and MongoDB. Browse, search, filter, and explore thousands of movies and TV shows with an intuitive, fast, and beautiful interface.

## ✨ Features

- **Movie & TV Series Browsing**: Explore extensive libraries of movies and TV series with detailed information
- **Advanced Filtering**: Filter by genre, type (movie/series), release year, country, and more
- **Powerful Search**: Full-text search functionality to find movies by title
- **Popular & Top-Rated Content**: Browse popular movies, TV shows, and top-rated IMDb content
- **Movie Details**: Comprehensive movie pages with plots, ratings, cast, runtime, and more
- **Responsive Design**: Beautiful, mobile-first UI with Tailwind CSS and Framer Motion animations
- **Pagination**: Efficient browsing with server-side pagination
- **SEO Optimized**: Meta tags, sitemaps, and structured data for better search engine visibility
- **Performance Monitoring**: Integrated Vercel Analytics and Speed Insights
- **Light/Dark Mode Ready**: Radix UI components with theme support

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with PostCSS 4
- **Radix UI** - Unstyled, accessible component library
- **Framer Motion** - Advanced animations and gestures
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering for content
- **React Intersection Observer** - Lazy loading and viewport detection

### Backend & Data
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Next.js API Routes** - Serverless API endpoints
- **Server Actions** - Next.js server-side functions

### External Services
- **Vercel Analytics** - Performance monitoring
- **Vercel Speed Insights** - Performance metrics

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Next-gen bundler for development

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB Atlas account or local MongoDB instance
- (Optional) Vercel account for deployment

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movies-mh24.git
cd movies-mh24
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Vercel (Optional - for production)
VERCEL_ENV=production
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (home)/                   # Homepage layout group
│   │   ├── page.tsx             # Home page
│   │   └── home-components/     # Home-specific components
│   ├── (root)/                  # Main content layout group
│   │   ├── content/[type]/      # Dynamic content pages
│   │   ├── filter/              # Filter page
│   │   ├── genre/[genre]/       # Genre-specific pages
│   │   ├── search/[title]/      # Search results
│   │   └── top-imdb/            # Top IMDb movies
│   ├── api/                     # API routes
│   │   ├── movies/              # Movies endpoint
│   │   └── sitemap-movies/      # Sitemap generation
│   ├── movie-details/           # Movie detail pages
│   │   └── [id]/                # Dynamic movie pages
│   └── test/                    # Testing/demo pages
│
├── components/
│   ├── shared/                  # Reusable shared components
│   │   ├── MovieCollection.tsx
│   │   ├── MoviePoster.tsx
│   │   ├── Filter.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── ui/                      # Radix UI composed components
│       ├── button.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ...
│
├── lib/
│   ├── actions/                 # Server actions
│   │   ├── movies.actions.ts
│   │   ├── search.actions.ts
│   │   └── ...
│   ├── database/
│   │   ├── mongoose.ts          # DB connection
│   │   └── models/              # MongoDB schemas
│   ├── hooks/                   # React hooks
│   └── utils.ts                 # Utility functions
│
├── types/
│   └── index.ts                 # TypeScript type definitions
│
├── constants/
│   └── index.ts                 # App constants & genres
│
└── public/                      # Static assets
    └── images/
```

## 🗺 Pages & Routes

### Public Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with popular movies and series |
| `/filter` | Advanced filtering interface |
| `/genre/[genre]` | Movies filtered by genre |
| `/search/[title]` | Search results |
| `/top-imdb` | Top-rated IMDb movies |
| `/content/[type]` | Movies or Series listings |
| `/movie-details/[id]` | Individual movie detail page |

## 🔌 API Endpoints

### Get Movies
**GET** `/api/movies`

Query Parameters:
- `limit` (number): Results per page (1-100, default: 10)
- `skip` (number): Results to skip for pagination (default: 0)
- `type` (string): Filter by "movie" or "series"
- `genre` (string): Filter by genre
- `query` (string): Search query

Response:
```json
[
  {
    "_id": "movie_id",
    "title": "Movie Title",
    "year": 2023,
    "type": "movie",
    "genres": ["Action", "Adventure"],
    "poster": "image_url",
    "plot": "Movie synopsis...",
    "rating": 7.5,
    "runtime": 148,
    "cast": ["Actor 1", "Actor 2"],
    "country": ["Country"]
  }
]
```

## 🎨 Customization

### Add New Genres
Edit [src/constants/index.ts](src/constants/index.ts):

```typescript
export const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  // Add more genres here
];
```

### Modify Styling
- Global styles: [src/app/globals.css](src/app/globals.css)
- Tailwind config: `tailwind.config.ts` in root
- Component themes: Individual component files in `src/components/ui/`

### Add Movie Sources
Update image sources in [next.config.ts](next.config.ts):

```typescript
images: {
  remotePatterns: [
    // Add new image source domains here
  ]
}
```

## 🔐 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `VERCEL_ENV` | Environment (development/production) | No |

## 📊 Database Models

### Movie Model
Stores movie and TV series data with fields for:
- Title, plot, genres, cast
- Ratings, runtime, release year
- Poster images and IMDb IDs

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel settings
4. Click Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Deploy to Other Platforms

The project can also be deployed to:
- **Netlify** (with serverless functions)
- **Docker** (containerized deployment)
- **Self-hosted** (traditional Node.js server)

## 📝 Available Scripts

```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is available for educational and personal use. Please check the [LICENSE](LICENSE) file for details.

## 🙋 Support

For issues, questions, or suggestions, please:
- Open an issue on GitHub
- Check existing documentation
- Review the [Next.js documentation](https://nextjs.org/docs)

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Framer Motion](https://www.framer.com/motion/)

## 👨‍💻 Author
**Mahfuzul**
**Movies MH24** - A modern, full-stack movie discovery platform

---

**Last Updated**: February 2026 | **Version**: 0.1.0