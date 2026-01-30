# IlluVista 🎨

A premium digital art marketplace built with Next.js, featuring secure authentication, role-based access control, and a beautiful modern UI.

## 🌟 Features

### For Art Collectors (Buyers)
- Browse curated digital art collections
- Secure checkout with order tracking
- Personal account dashboard
- Purchase history and favorites
- Shopping cart with real-time updates

### For Artists
- Upload and manage artwork portfolios
- Track sales and earnings
- Artist dashboard with analytics
- Manage artwork visibility (Draft/Published/Sold)

### For Administrators
- Platform-wide user management
- Order and artwork moderation
- Analytics and reporting
- System health monitoring

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with HttpOnly cookies
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber

### Project Structure
```
src/
├── app/
│   ├── (public)/          # Public routes (homepage, gallery, pricing)
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── admin/             # Admin-only routes
│   └── api/               # API routes (auth, artworks, orders)
├── components/            # Reusable UI components
├── context/               # React Context providers (Auth, Cart)
├── lib/                   # Utilities and database connection
├── models/                # MongoDB/Mongoose models
├── services/              # Business logic layer
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhumit267/Illuvista.git
   cd Illuvista
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication & Security

- **JWT-based authentication** with secure HttpOnly cookies
- **Role-Based Access Control (RBAC)** for Admin, Artist, and Buyer roles
- **Protected routes** via Next.js middleware
- **Password hashing** with bcryptjs
- **Session persistence** across page reloads

### Demo Accounts
- **Admin**: `admin@illuvista.com` / `password123`
- **Artist**: `elena@art.com` / `password123`
- **Buyer**: `bob@collector.com` / `password123`

## 📄 Key Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Homepage with hero and featured artworks | Public |
| `/gallery` | Browse all published artworks | Public |
| `/pricing` | Platform pricing tiers | Public |
| `/login` | User authentication | Public |
| `/register` | New user registration | Public |
| `/dashboard` | Artist dashboard (upload, manage artworks) | Artist only |
| `/account` | Buyer account (purchases, settings) | Buyer only |
| `/admin` | Platform administration | Admin only |

## 🎨 Design Philosophy

- **Premium aesthetic** with glassmorphism and smooth animations
- **Mobile-first responsive design**
- **Dark mode optimized** color palette
- **Accessibility-focused** with semantic HTML and ARIA labels

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables (`MONGODB_URI`, `JWT_SECRET`)
4. Deploy!

For detailed deployment instructions, see [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Organized route groups for scalability

## 📚 API Routes

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user session
- `POST /api/auth/logout` - End user session

### Artworks
- `GET /api/artworks` - List all artworks
- `POST /api/artworks` - Create new artwork (Artist only)
- `PUT /api/artworks/:id` - Update artwork (Artist only)
- `DELETE /api/artworks/:id` - Delete artwork (Artist only)

### Orders
- `GET /api/orders` - List user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin only)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Bhumit Peswani**
- GitHub: [@Bhumit267](https://github.com/Bhumit267)

---

Built with ❤️ using Next.js and modern web technologies.
