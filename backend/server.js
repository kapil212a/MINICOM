const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Compile API
app.post("/compile", (req, res) => {
  const expr = req.body.expr;

  if (!expr) {
    return res.json({ error: "No expression provided" });
  }

  // Dummy logic (demo)
  const tokens = expr.match(/[a-zA-Z]+|\d+|[+\-*/()]/g) || [];

  const tac = [
    "t1 = b * 2",
    "t2 = a + t1",
    "t3 = t2 - c"
  ];

  const asm = [
    "MOV EAX, [b]",
    "IMUL EAX, 2",
    "ADD EAX, [a]",
    "SUB EAX, [c]",
    "MOV [result], EAX"
  ];

  res.json({ tokens, tac, asm });
});

// PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});