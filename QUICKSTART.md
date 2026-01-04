# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Generate JWT Secret

```bash
cd Backend
node generate-jwt-secret.js
```

Copy the generated secret.

### 2. Setup Backend Environment

```bash
cd Backend
cp .env.example .env
```

Edit `Backend/.env`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=paste_generated_secret_here
ADMIN_MASTER_PASSWORD=your_admin_password
PORT=5000
```

### 3. Setup Frontend Environment

```bash
cd Frontend
cp .env.example .env
```

`Frontend/.env` should contain:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Install Dependencies

```bash
# Backend
cd Backend
npm install

# Frontend (in new terminal)
cd Frontend
npm install
```

### 5. Start Servers

```bash
# Terminal 1 - Backend
cd Backend
npm start
# Should see: "Server running on port 5000"

# Terminal 2 - Frontend
cd Frontend
npm start
# Should open browser at http://localhost:3000
```

### 6. Test the Application

1. Register a new account at http://localhost:3000/register
2. Login with your credentials
3. Browse the shopping catalog
4. Add items to cart
5. View your dashboard

### 7. Test Admin Features

1. Go to http://localhost:3000/admin/login
2. Enter your ADMIN_MASTER_PASSWORD
3. Manage products in the shop

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register new user
- [ ] Can login and see dashboard
- [ ] Can browse shopping page
- [ ] Cart persists after refresh
- [ ] Admin login works
- [ ] Can add/edit/delete products as admin

## 🐛 Common Issues

**"Cannot connect to backend"**

- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in Frontend/.env

**"JWT_SECRET is not defined"**

- Run generate-jwt-secret.js
- Add JWT_SECRET to Backend/.env
- Restart backend

**"Invalid credentials"**

- Check Supabase URL and Service Key
- Ensure using SERVICE_KEY not anon key

## 📚 Next Steps

See [README.md](README.md) for full documentation.
