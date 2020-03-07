
const path = require('path');
const debug = require('debug');
const { app, BrowserWindow, protocol } = require('electron')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 有些 API 只能在這個事件發生後才能用。
app.on('ready', () => {
  createWindow();
})

function createWindow () {

  debug('core:app')('ready...');

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  registerProtocol('build', path.resolve( process.cwd(), 'build' ));

  // and load the index.html of the app.
  win.loadFile('./html/index.html');

  // Open the DevTools.
  // win.webContents.openDevTools()
}

// register protocol (need after app ready)
function registerProtocol( name, refDir ) {

  // protocol need use lower case
  name = name.toLowerCase();
  debug('core:protocol')( `register: ${name} to ${refDir}`);

  protocol.registerFileProtocol( name, (request, callback) => {

    if (request.url) {
      const url = path.normalize( request.url ).substr( name.length + 1 );
    
      debug('core:protocol')( 'before: ' + url );
      debug('core:protocol')( 'after: ' + path.join( refDir, url ) );
      
      callback(path.join( refDir, url ))
    } else {
      console.error( 'Failed to register protocol: ' + name );
    }

  });
    
}