const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ Lexical Analyzer
function lexer(input) {
  let tokens = [];
  let i = 0;

  while (i < input.length) {
    let ch = input[i];

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

// ✅ API
app.post("/compile", (req, res) => {
  const expr = req.body.expr;

  if (!expr) {
    return res.json({ error: "No expression provided" });
  }

  const tokens = lexer(expr);

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

  res.json({
    tokens,
    tac,
    asm,
    tokenCount: tokens.length
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});