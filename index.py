import os

# Infos abfragen
name = input("Wie heißt du? ")
alter = input("Wie alt bist du? ")
mc_name = input("Wie ist dein Minecraft-Name? ")
warum = input("Warum willst du ins Team? ")

# Desktop-Pfad automatisch holen
desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")

# Ordner auf dem Desktop erstellen
ordner_name = "Minecraft-Bewerbungen"
ordner_pfad = os.path.join(desktop_path, ordner_name)
os.makedirs(ordner_pfad, exist_ok=True)

# Dateiname und Pfad
dateiname = f"bewerbung_{name.lower()}.txt"
dateipfad = os.path.join(ordner_pfad, dateiname)

# Inhalt schreiben
with open(dateipfad, "w", encoding="utf-8") as datei:
    datei.write("Minecraft Server Bewerbung\n")
    datei.write("===========================\n")
    datei.write(f"Name: {name}\n")
    datei.write(f"Alter: {alter}\n")
    datei.write(f"Minecraft-Name: {mc_name}\n")
    datei.write("Warum ich ins Team will:\n")
    datei.write(warum + "\n")

print(f"\n✅ Deine Bewerbung wurde gespeichert unter:\n{dateipfad}")

