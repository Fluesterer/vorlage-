const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = 3004;

app.post('/bewerbung', (req, res) => {
  const { discord, minecraft, alter, interessen, staerken, warum } = req.body;

  // ✅ Bewerbung-ID erstellen
  const bewerbungsID = Date.now();

  // ✅ Desktop-Pfad herausfinden
  const desktopPath = path.join(os.homedir(), 'Desktop');

  // ✅ Datei-Inhalt zusammenbauen
  const content = `Bewerbung ID: ${bewerbungsID}
Minecraft-Name: ${minecraft}
Discord-Name: ${discord}
Alter: ${alter}
Interessen: ${interessen}
Stärken: ${staerken}
Warum wir dich nehmen sollten: ${warum}
`;

  // ✅ Datei speichern auf dem Desktop
  const filePath = path.join(desktopPath, `Bewerbung_${bewerbungsID}.txt`);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Fehler beim Schreiben der Datei:', err);
      return res.status(500).send('Ein Fehler ist aufgetreten.');
    }
    res.send(`
      <h2>Danke für deine Bewerbung!</h2>
      <p>Deine Bewerbung wurde gespeichert.</p>
      <p>Check deinen Desktop für die Datei: <strong>Bewerbung_${bewerbungsID}.txt</strong></p>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
