import electron from "electron";

import { app, BrowserWindow } from "electron";

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let myWindow;

function createWindow() {
  // Créer le browser window.
  myWindow = new BrowserWindow({ width: 800, height: 600 });

  // et charge le index.html de l'application.
  myWindow.loadFile("index.html");

  // Ouvre les DevTools.
  // win.webContents.openDevTools()

  // Émit lorsque la fenêtre est fermée.
  myWindow.on("closed", () => {
    // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
    // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
    // où vous devez supprimer l'élément correspondant.
    myWindow = null;
  });
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.on("ready", createWindow);

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on("window-all-closed", () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow();
  }
});
