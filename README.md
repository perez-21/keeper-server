# [Keeper Password Manager](https://keeper-password-mgr.vercel.app/) Server

A secure backend server for managing and storing passwords, built with NestJS.

## Features

- 🔐 Secure password storage with bcrypt hashing
- 🔑 JWT-based authentication
- 👤 User registration and login
- 🔒 Password management (create, read, update, delete)
- 🛡️ Protected routes with JWT authentication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/keeper_db"
JWT_SECRET="your-secure-jwt-secret"
```

## Installation

```bash
# Install dependencies
$ npm install

# Generate Prisma client
$ npx prisma generate
```

## Database Setup

```bash
# Run database migrations
$ npx prisma migrate dev
```

## Running the Application

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/profile` - Get user profile (protected)

### Passwords
- `POST /passwords` - Create a new password entry (protected)
- `GET /passwords` - Get all password entries (protected)
- `GET /passwords/:id` - Get a specific password entry (protected)
- `PATCH /passwords/:id` - Update a password entry (protected)
- `DELETE /passwords/:id` - Delete a password entry (protected)

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for secure authentication
- Protected routes requiring authentication
- Secure password storage and retrieval

## Technologies Used

- NestJS - Progressive Node.js framework
- Prisma - Next-generation ORM
- PostgreSQL - Relational database
- JWT - JSON Web Tokens for authentication
- bcrypt - Password hashing

## Development

```bash
# Run tests
$ npm run test

# Run e2e tests
$ npm run test:e2e

# Generate test coverage
$ npm run test:cov
```

## License

This project is licensed under the MIT License.
