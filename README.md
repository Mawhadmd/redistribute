# Redistribute.io - Content Creator Management Platform

A full-stack web application for content creators to manage their social media presence, schedule posts, track analytics, and shop for creator equipment. Built with React, Node.js/Express, and Supabase.

## 🚀 Features

### Authentication & Authorization

- **JWT-based authentication** with secure token management
- User registration and login
- Admin portal with separate authentication
- Protected routes with role-based access control
- Token expiration and refresh handling

### Content Creator Tools

- Dashboard with overview and analytics
- Multi-platform social media management
- Content calendar and scheduling
- Account management across platforms
- Workflow automation
- Analytics and performance tracking

### E-Commerce

- Shopping catalog for creator equipment
- Product categories: Lighting, Audio, Stabilization, Backgrounds, Accessories
- Shopping cart with localStorage persistence
- Product management (Admin only)
- Image upload and management

### Admin Features

- Product CRUD operations (Create, Read, Update, Delete)
- Image upload and management
- User management
- Protected admin routes

## 🏗️ Architecture

### Frontend (React)

- **Create React App** with TypeScript
- **React Router** for navigation
- **Context API** for state management (Cart, Auth)
- **Tailwind CSS** for styling
- **Lucide React** for icons
- JWT token storage and management

### Backend (Node.js/Express)

- **Express.js** REST API
- **JWT authentication** with jsonwebtoken
- **Supabase** for database and storage
- **CORS** enabled for cross-origin requests
- Environment-based configuration

### Database (Supabase)

- User profiles with roles
- Shop items with images
- Secure file storage
- Real-time capabilities

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Supabase account** (free tier works)
- A code editor (VS Code recommended)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd react-project
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd Backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `Backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# JWT Configuration (REQUIRED)
# Generate a secure secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_generated_jwt_secret_at_least_32_characters

# Admin Configuration
ADMIN_MASTER_PASSWORD=your_secure_admin_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Important:**

- Use the **Service Role Key** from Supabase (not the anon/public key)
- Generate a strong JWT secret using the provided command
- Never commit your `.env` file to version control

#### Start Backend Server

```bash
npm start
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd Frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `Frontend` directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
```

#### Start Frontend Development Server

```bash
npm start
```

Application will open at `http://localhost:3000`

## 🔐 Authentication Flow

### User Authentication

1. User registers or logs in via `/register` or `/login`
2. Backend validates credentials and generates JWT token (7-day expiration)
3. Frontend stores token in localStorage as `authToken`
4. All protected API calls include token in Authorization header: `Bearer <token>`
5. Backend verifies token on each protected route request

### Admin Authentication

1. Admin logs in with master password at `/admin/login`
2. Backend verifies password and generates JWT with admin role
3. Admin routes require valid token with `role: "admin"`

### Token Management

- Tokens expire after 7 days
- Frontend automatically includes token in API requests
- Invalid/expired tokens redirect to login
- Logout removes token from localStorage

## 📁 Project Structure

```
react-project/
├── Backend/
│   ├── server.js              # Express server with JWT auth
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment template
│   └── .env                   # Your config (git-ignored)
│
├── Frontend/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ShoppingCards.tsx
│   │   │   └── buttons/
│   │   ├── contexts/          # React Context providers
│   │   │   ├── CartContext.tsx      # Shopping cart state
│   │   │   └── AuthContext.tsx      # Auth state (optional)
│   │   ├── lib/
│   │   │   └── api.ts         # API client with JWT handling
│   │   ├── pages/
│   │   │   ├── Landing/       # Marketing pages
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── Dashboard/     # User dashboard
│   │   │   ├── admin/         # Admin portal
│   │   │   ├── Cart.tsx       # Shopping cart
│   │   │   └── Shopping.tsx   # Product catalog
│   │   ├── App.tsx            # Main app component
│   │   └── index.tsx          # Entry point
│   ├── package.json
│   ├── .env.example
│   └── .env
│
└── MIGRATION_GUIDE.md         # Migration documentation
```

## 🛣️ API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration (returns JWT)
- `POST /api/auth/signin` - User login (returns JWT)
- `POST /api/auth/signout` - User logout
- `GET /api/auth/user` - Get current user (protected)
- `GET /api/auth/verify` - Verify JWT token (protected)

### Admin

- `POST /api/admin/verify-password` - Admin login (returns JWT)

### Shop Items

- `GET /api/shop/items` - Get all shop items (public)
- `POST /api/shop/items` - Add new item (protected, admin only)
- `PUT /api/shop/items/:id` - Update item (protected, admin only)
- `DELETE /api/shop/items/:id` - Delete item (protected, admin only)

### File Upload

- `POST /api/upload/image` - Upload image (protected, admin only)
- `DELETE /api/upload/image` - Delete image (protected, admin only)

### Health Check

- `GET /api/health` - Server health status (public)

## 🎨 Frontend Routes

### Public Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/pricing` - Pricing information
- `/shopping` - Product catalog
- `/cart` - Shopping cart
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require JWT)

- `/dashboard` - User dashboard
- `/dashboard/workflows` - Workflow management
- `/dashboard/content` - Content management
- `/dashboard/accounts` - Social accounts
- `/dashboard/schedule` - Content scheduling
- `/dashboard/analytics` - Analytics
- `/dashboard/billing` - Billing
- `/dashboard/settings` - Settings

### Admin Routes (Require Admin JWT)

- `/admin/login` - Admin login
- `/admin` - Admin dashboard
- `/admin/shopping` - Product management

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Handled by Supabase Auth
- **Role-Based Access Control** - Admin vs User roles
- **Environment Variables** - Sensitive data in .env files
- **CORS Protection** - Configured allowed origins
- **Service Role Key** - Backend uses secure Supabase key
- **Token Expiration** - 7-day token lifetime
- **Protected Routes** - Middleware authentication checks

## 🚀 Deployment

### Backend Deployment (Example: Heroku, Railway, Render)

1. Set environment variables in hosting platform
2. Ensure `JWT_SECRET` is set and secure
3. Update CORS origins to include production URL
4. Deploy from main branch

### Frontend Deployment (Example: Vercel, Netlify)

1. Set `REACT_APP_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `build` folder

### Environment Variables Checklist

**Backend:**

- ✅ SUPABASE_URL
- ✅ SUPABASE_SERVICE_KEY
- ✅ JWT_SECRET (critical!)
- ✅ ADMIN_MASTER_PASSWORD
- ✅ PORT (optional)
- ✅ NODE_ENV=production

**Frontend:**

- ✅ REACT_APP_API_URL (production backend URL)

## 🧪 Testing

### Manual Testing Checklist

- [yes] User registration works and returns JWT
- [yes] User login works and stores token
- [yes] Protected routes redirect when not authenticated
- [yes] Token verification works on page refresh
- [yes] Admin login works separately
- [yes] Cart persists across sessions
- [yes] Admin can CRUD products
- [yes] Logout clears token and redirects

### API Testing (Postman/Thunder Client)

Use the API endpoints listed above with appropriate JWT tokens in headers.

## 🐛 Troubleshooting

### "JWT_SECRET is not defined"

- Ensure `.env` file exists in Backend folder
- Check JWT_SECRET is set in `.env`
- Restart backend server after adding env vars

### CORS Errors

- Verify backend CORS config includes your frontend URL
- Check ports match (Frontend: 3000, Backend: 5000)

### "Invalid or expired token"

- Clear localStorage and login again
- Check JWT_SECRET hasn't changed
- Verify token expiration time

### Cart not persisting

- Check browser localStorage
- Ensure CartProvider wraps routes in App.tsx

### Database connection issues

- Verify SUPABASE_URL and SUPABASE_SERVICE_KEY
- Check Supabase project is active
- Ensure database tables exist

## 📝 Development Notes

### JWT Token Format

```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "user" | "admin",
  "iat": 1234567890,
  "exp": 1235172690
}
```

### localStorage Keys

- `authToken` - JWT authentication token
- `userInfo` - User profile data
- `shopping_cart` - Cart items with quantities

### Adding New Protected Routes

1. Add middleware to backend route: `app.get('/api/route', authenticateToken, handler)`
2. Frontend API call must use `getAuthHeaders()` from api.ts
3. Add role check in handler if admin-only: `if (req.user.role !== "admin") ...`

## 🤝 Contributing

We don't recieve contriubtion at this moment

## 📄 License

Creative commons

## 👨‍💻 Author

Mohammed Awad

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- Tailwind CSS for styling
- Lucide React for icons
- Create React App for scaffolding

---

For more detailed migration information, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
