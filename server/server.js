const express = require('express');
const cors = require('cors');
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const PORT = 8080;

// Create database connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "468161Ro@",
  database: "payroll",
});

// MySQL session store options
const sessionStore = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '468161Ro@',
  database: 'payroll'
});

// Middleware for CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Configure sessions
app.use(session({
  key: 'user_session',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24
  }
}));

sessionStore.onReady().then(() => {
  console.log('Session store is ready.');
}).catch((error) => {
  console.error('Error initializing session store:', error);
});

// Home route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Payroll Backend!' });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const query = `
    SELECT Users.user_id, Companies.email, Users.password, Companies.company_name, Users.username
    FROM Companies
    JOIN Users ON Companies.contact_person_id = Users.user_id
    WHERE Companies.email = ?;
  `;

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      // Set session data
      req.session.isAuth = true;
      req.session.user = {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        company_name: user.company_name,
      };

      console.log("Session after login:", req.session);

      return res.status(200).json({
        message: "Login successful.",
        redirectPath: "/company/user/payroll/management-panel",
        user: req.session.user,
      });
    } catch (error) {
      console.error("Password comparison error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
});

// Registration route
app.post("/payroll/new/user", (req, res) => {
  const { aboutCompany, aboutCompanyAdmin } = req.body;
  const { compName, compEmail, country, currency } = aboutCompany;
  const { userName, role, phoneNumber, userEmail, password, confirmPassword } = aboutCompanyAdmin;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const insertUserQuery = `
    INSERT INTO Users (username, password, role, email, status) 
    VALUES (?, ?, ?, ?, ?);
  `;

  const insertCompanyQuery = `
    INSERT INTO Companies (company_name, contact_person_id, email, country, currency) 
    VALUES (?, ?, ?, ?, ?);
  `;

  db.query(insertUserQuery, [userName, hashedPassword, role, userEmail, 'Active'], (err, userResult) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Database error while creating user." });
    }

    const userId = userResult.insertId;

    db.query(insertCompanyQuery, [compName, userId, compEmail, country, currency], (err) => {
      if (err) {
        console.error("Error inserting company:", err);
        return res.status(500).json({ message: "Database error while creating company." });
      }

      req.session.isAuth = true;
      req.session.user = {
        user_id: userId,
        email: compEmail,
        username: userName,
        company_name: compName,
      };

      console.log("Session after registration:", req.session);

      return res.status(201).json({
        message: "Company registered successfully!",
        redirectPath: "/company/user/payroll/management-panel",
      });
    });
  });
});

// Check if the user is logged in
app.get("/isloggedin", (req, res) => {
  if (req.session.isAuth) {
    console.log("logged in");
    console.log("Session data on /isloggedin:", req.session);
    return res.status(200).json({
      loggedIn: true,
      user: req.session.user,
    });
  }
  console.log("not logged in");
  return res.status(200).json({ loggedIn: false });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Failed to log out." });
    }
    res.clearCookie("user_session");
    return res.status(200).json({ message: "Logout successful." });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
