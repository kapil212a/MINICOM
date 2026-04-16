async function compileExpr() {
  const expr = document.getElementById("expr").value;

  if (!expr) {
    alert("Enter expression");
    return;
  }

  try {
    const res = await fetch("https://minicom-68of.onrender.com/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ expr })
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById("tokens").innerText = data.tokens.join("\n");
    document.getElementById("tac").innerText = data.tac.join("\n");
    document.getElementById("asm").innerText = data.asm.join("\n");

    document.getElementById("count").innerText =
      "Token Count: " + data.tokenCount;

  } catch (err) {
    alert("Backend not working");
  }
}

function resetAll() {
  document.getElementById("expr").value = "";
  document.getElementById("tokens").innerText = "";
  document.getElementById("tac").innerText = "";
  document.getElementById("asm").innerText = "";
  document.getElementById("count").innerText = "";
}