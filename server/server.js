const express = require('express');
const cors = require('cors');
const mysql = require("mysql2");

const app = express();
const PORT = 8080;

// Create db connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "468161Ro@",
  database: "LibManageDB"
});


// Middleware Setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, this is a backend node server!' });
});

app.post("/payroll/new/user",(req,res)=>{
  const data = req.body;
  
  // company identity
  const compName = data.aboutCompany.compName;
  const compEmail = data.aboutCompany.compEmail;
  const country = data.aboutCompany.country;
  const currency = data.aboutCompany.currency;

  // data about our company user
  const userName = data.aboutCompanyAdmin.userName;
  const role = data.aboutCompanyAdmin.role;
  const phoneNumber = data.aboutCompanyAdmin.phoneNumber;
  const userEmail = data.aboutCompanyAdmin.companyUserEmail;
  const password = data.aboutCompanyAdmin.password;
  const confirmPassword = data.aboutCompanyAdmin.confirmPassword;

  if (password !== confirmPassword){
    res.status(400).json({gotPasswordError : "passwords are not matching!"})
  }
  // console.log("this is our companys name: ",compName)
  // res.status(200).json({ message: "Company information submitted successfully!" });

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
