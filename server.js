const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/bewerbung", (req, res) => {
  const { name, email, discord, fluest, alter, interesse, staerken, warum } = req.body;

  // Bewerber muss mindestens 14 Jahre alt sein
  if (parseInt(alter) < 14) {
    return res.send(`
      <h1 style="text-align:center;color:red;">Bewerbung abgelehnt!</h1>
      <p style="text-align:center;">Leider müssen Bewerber mindestens 14 Jahre alt sein.</p>
      <a href="/" style="display:block;text-align:center;margin-top: 20px;">Zurück zur Bewerbung</a>
    `);
  }

  const id = Math.random().toString(36).substr(2, 8).toUpperCase();
  const content = `Bewerbungs-ID: ${id}
Name: ${name}
E-Mail: ${email}
Discord: ${discord}
Flüsterer: ${fluest}
Alter: ${alter}

Interessen: ${interesse}
Stärken: ${staerken}
Warum sollten wir dich nehmen? ${warum}

**Wichtiger Hinweis**: Bitte trete unserem [Discord-Server](https://discord.gg/Slimecraft) bei, um deine Bewerbung abzuschließen.`;

  const savePath = path.join(__dirname, "bewerbungen");
  if (!fs.existsSync(savePath)) fs.mkdirSync(savePath);

  const filename = `${id}_${name.replace(/[^a-z0-9]/gi, "_")}.txt`;
  fs.writeFileSync(path.join(savePath, filename), content);

  res.send(`
    <h1 style="text-align:center;">Danke für deine Bewerbung!</h1>
    <p style="text-align:center;">Deine Bewerbungs-ID: <strong>${id}</strong></p>
    <p style="text-align:center;">Wir haben deine Bewerbung erhalten. Mach dich bereit, eine E-Mail zu bekommen, und trete unserem [Discord-Server](https://discord.gg/Slimecraft) bei.</p>
    <a href="/" style="display:block;text-align:center;margin-top: 20px;">Zurück zur Bewerbung</a>
  `);
});

app.listen(port, () => {
  console.log(`Slimecraft läuft auf http://localhost:${port}`);
});
