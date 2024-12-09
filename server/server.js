const express = require('express');
const cors = require('cors');
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);



const app = express();
const PORT = 8080;

// Create db connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "468161Ro@",
  database: "payroll",
});


// Use CORS first
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "468161Ro@",
  database: "payroll",
});
// session configuratins
app.use(
  session({
    secret: "softcloud",
    store : sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, this is a backend node server!' });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate request data
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // SQL query to check credentials
  const check_email = `
    SELECT Users.user_id, Companies.email, Users.password, Companies.company_name, Users.username
    FROM Companies
    JOIN Users ON Companies.contact_person_id = Users.user_id
    WHERE Companies.email = ?;
  `;

  db.query(check_email, [email], async (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    // Checking if the user exists
    if (results.length === 0) {
      return res.status(200).json({ message: "User not found." });
    }

    const user = results[0];

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(200).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        { email: user.email, username: user.username, company: user.company_name },
        "softcloudauth",
        { expiresIn: "1h" }
      );

      //TODO: Setting session data
      req.session.user = {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        company_name: user.company_name,
      };

      console.log(req.session)

      return res.status(200).json({
        message: "Login successful.",
        redirectPath: "/company/user/payroll/management-panel",
        token,
        user: {
          email: user.email,
          username: user.username,
          company: user.company_name,
        },
        
      });
    } catch (error) {
      console.error("Error during password comparison:", error);
      return res.status(200).json({ message: "Internal server error." });
    }
  });
});

// Route to handle new user registration
app.post("/payroll/new/user", (req, res) => {
  const data = req.body;

  // Company identity
  const { compName, compEmail, country, currency } = data.aboutCompany;

  // User data
  const { 
    userName, 
    role, 
    phoneNumber, 
    userEmail, 
    password, 
    confirmPassword 
  } = data.aboutCompanyAdmin;

  // Validate passwords
  if (password !== confirmPassword) {
    return res.status(200).json({ gotPasswordError: "Passwords do not match!" }); // Use `return` to stop further execution
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Query to insert new user
  const updateCompanyUserQuery = `
    INSERT INTO Users (username, password, role, email, status) 
    VALUES (?, ?, ?, ?, ?)
  `;
  // query to add company information
  const updateAboutCompanyQuery = `
    INSERT INTO Companies(company_name, contact_person_id, email , country,currency) 
    VALUES (?, ?, ?, ?,?)
  `;
  // Execute query
  try {
    db.query(updateCompanyUserQuery, [userName, hashedPassword, role, userEmail, 'Active'], (err, result) => {
      if (err) {
        console.error("Error inserting into the database:", err);
        return res.status(500).json({ error: "Database error occurred." });
      }
      const company_user_id = result.insertId;
      db.query(updateAboutCompanyQuery,[compName,company_user_id,compEmail,country,currency],(err,result)=>{
        if (err){
          console.log("error while updating Company identity!",err);
          return res.status(500).json({error : "data base error occured while updating aboutCompany"})
        }
      })
      req.session.user = {
        user_id: company_user_id,
        email: compEmail,
        username: userName,
        company_name: compName,
      };

      
      console.log("Data successfully inserted into the database!");
      return res.status(201).json({ 
        message: "Company information submitted successfully!", 
        redirectPath: "/company/user/payroll/management-panel" 
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Something went wrong on the server." });
  }
}); 

app.get("/isloggedin/api", (req, res) => {
  console.log("test an api across all routes: ",req.session.user)
  if (req.session && req.session.user) {
    // User is logged in
    res.status(200).json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.status(401).json({
      loggedIn: false,
      message: "User not logged in.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
