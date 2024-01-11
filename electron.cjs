const { app, BrowserWindow } = require('electron');

function createWindow () {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Esto puede ser necesario dependiendo de tu versión de Electron y configuración.
      enableRemoteModule: true, // Esto también puede ser necesario para ciertas funcionalidades de Electron.
    }
  });

  // y carga el archivo index.html de tu aplicación.
  win.loadURL('http://localhost:5173'); // Asegúrate de que el puerto coincida con el servidor de Vite.
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
