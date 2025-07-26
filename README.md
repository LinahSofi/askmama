# AskMama 

**AskMama** is a full-stack Q&A web application built with React, Node.js, Express, and MongoDB. It allows users to register, log in, select categories like Pregnancy, Childbirth, or Marriage, and view or submit questions and answers related to those topics.

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Tooling**: dotenv, bcrypt, ESLint


## Features

- User registration & login with JWT authentication
- View categories and questions
- Submit new questions and answers
- Protected routes (e.g. Dashboard)
- Styled using Bootstrap
- Seed script to pre-fill database


## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/LinahSofi/askmama.git
cd askmama
```

### 2. Backend Setup (in `server/`)

- Create a `.env` file with the following:

```env
PORT=5050
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

- Install dependencies and start the server:

```bash
cd server
npm install
node server.js
```

### 3. Frontend Setup (in `client/`)

```bash
cd ../client
npm install
npm start
```


## Seed the Database

To insert demo users, categories, and questions:

```bash
node server/seed.js
```


## Project Structure

```
askmama/
├── client/        # React frontend
├── server/        # Express backend
│   ├── models/    # Mongoose schemas
│   ├── routes/    # API routes
│   ├── seed.js    # DB seed script
├── .env           # Environment variables
```


## Author

**Linah Sofi**  
Building with curiosity.  
based in the San Francisco Bay Area.
