const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));  

const FILE = "expenses.json";

// Get all expenses
app.get("/api/expenses", (req, res) => {
  fs.readFile(FILE, (err, data) => {
    res.json(JSON.parse(data));
  });
});

// Add expense
app.post("/api/expenses", (req, res) => {
  const { title, amount } = req.body;
  
  fs.readFile(FILE, (err, data) => {
    const expenses = JSON.parse(data);
    const newExpense = { id: Date.now(), title, amount };
    expenses.push(newExpense);

    fs.writeFile(FILE, JSON.stringify(expenses), () => {
      res.json(newExpense);
    });
  });
});

// Start server
app.listen(3000, () => console.log("✅ Expense app running on http://localhost:3000"));
