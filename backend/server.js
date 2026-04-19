const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Lexical Analyzer Backend Running ✅");
});

//  LEXICAL ANALYZER
function lexer(input) {
  let tokens = [];
  let i = 0;

  while (i < input.length) {
    let ch = input[i];

    // Skip space
    if (ch === " ") {
      i++;
      continue;
    }

    // Identifier
    if (/[a-zA-Z]/.test(ch)) {
      let value = "";
      while (i < input.length && /[a-zA-Z]/.test(input[i])) {
        value += input[i];
        i++;
      }
      tokens.push(`ID(${value})`);
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let value = "";
      while (i < input.length && /[0-9]/.test(input[i])) {
        value += input[i];
        i++;
      }
      tokens.push(`NUM(${value})`);
      continue;
    }

    // Operators
    if (ch === "+") tokens.push("PLUS(+)");
    else if (ch === "-") tokens.push("MINUS(-)");
    else if (ch === "*") tokens.push("MUL(*)");
    else if (ch === "/") tokens.push("DIV(/)");
    else if (ch === "(") tokens.push("LPAREN(()");
    else if (ch === ")") tokens.push("RPAREN())");
    else tokens.push(`UNKNOWN(${ch})`);

    i++;
  }

  return tokens;
}

//  API
app.post("/analyze", (req, res) => {
  const expr = req.body.expr;

  if (!expr) {
    return res.json({ error: "No input provided" });
  }

  const tokens = lexer(expr);

  res.json({
    tokens,
    tokenCount: tokens.length
  });
});

//  PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});