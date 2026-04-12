async function compileExpr() {
  const expr = document.getElementById("expr").value;

  if (!expr) {
    alert("Please enter expression");
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

    document.getElementById("tokens").innerText = data.tokens.join("\n");
    document.getElementById("tac").innerText = data.tac.join("\n");
    document.getElementById("asm").innerText = data.asm.join("\n");

  } catch (error) {
    console.error(error);
    alert("Backend not working or URL wrong!");
  }
}

function resetAll() {
  document.getElementById("expr").value = "";
  document.getElementById("tokens").innerText = "";
  document.getElementById("tac").innerText = "";
  document.getElementById("asm").innerText = "";
}