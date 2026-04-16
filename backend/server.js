const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ LEXER
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

// ✅ SIMPLE DYNAMIC TAC (for: a + b * 2 type)
function generateTAC(expr) {
  let parts = expr.split(" ");

  if (parts.length === 5) {
    // Example: a + b * 2
    let t1 = `t1 = ${parts[2]} * ${parts[4]}`;
    let t2 = `t2 = ${parts[0]} ${parts[1]} t1`;
    return [t1, t2];
  }

  return ["Invalid expression format"];
}

// ✅ SIMPLE DYNAMIC ASM
function generateASM(expr) {
  let parts = expr.split(" ");

  if (parts.length === 5) {
    return [
      `MOV EAX, [${parts[2]}]`,
      `IMUL EAX, ${parts[4]}`,
      `ADD EAX, [${parts[0]}]`,
      `MOV [result], EAX`
    ];
  }

  return ["Invalid expression format"];
}

// ✅ API
app.post("/compile", (req, res) => {
  const expr = req.body.expr;

  if (!expr) {
    return res.json({ error: "No expression provided" });
  }

  const tokens = lexer(expr);
  const tac = generateTAC(expr);
  const asm = generateASM(expr);

  res.json({
    tokens,
    tac,
    asm,
    tokenCount: tokens.length
  });
});

// ✅ PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});