const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const PORT = 8080;

// Database connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "468161Ro@",
  database: "payroll",
});

// Session store using MySQL
const sessionStore = new MySQLStore({}, db);

// Middleware to parse JSON
app.use(express.json());

// Configure session
app.use(
  session({
    key: "user_session",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true only with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// auth middleware
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Payroll Backend!" });
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
        user: session.user,
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
  const { userName, role, phoneNumber, userEmail, password, confirmPassword } =
    aboutCompanyAdmin;

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

  db.query(insertUserQuery, [userName, hashedPassword, role, userEmail, "Active"], (err, userResult) => {
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
  if (req.session.isAuth && req.session.user) {
    console.log("Session data on /isloggedin:", req.session.user);
    console.log("is logged in")
    return res.status(200).json({
      loggedIn: true,
      user: req.session,
    });
  }
  console.log("not logged in")
  return res.status(200).json({ loggedIn: false });
});

app.post('/logout', (req, res) => {
  if (session) {
    req.session.isAuth = false;
    req.session.user = null;

    res.clearCookie('sessionID');
    res.status(200).send('Logged out successfully');
  } else {
    res.status(400).send('No session found');
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
