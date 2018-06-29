
import { app, BrowserWindow, protocol } from 'electron' ;
import path from 'path';
import debug from 'debug';

debug('core:main')('process.argv: ' + process.argv);

// electron app ready
app.on( 'ready', () => {

    registerProtocol( 'build', path.resolve( process.cwd(), 'build' ) );

    debug('core:app')('ready...');

    let mainWindow = new BrowserWindow({
        width: 685,
        resizable: false,
        frame: false,
        useContentSize: true,
    });
    
    // load entry html
    mainWindow.loadURL( path.resolve('./build/html/index.html') );

    if( process.argv.indexOf('--dev')>-1 ) {
        // open debug tool
        mainWindow.webContents.openDevTools({
            mode: 'undocked', // right, bottom, undocked, detach
        });
    }

});

// register protocol (need after app ready)
function registerProtocol( name, refDir ) {

    // protocol need use lower case
    name = name.toLowerCase();

    protocol.registerFileProtocol( name, (request, callback) => {

        const url = path.normalize( request.url ).substr( name.length + 1 );
        
        debug('core:protocol')( 'before: ' + url );
        debug('core:protocol')( 'after: ' + path.join( refDir, url ) );
        
        callback({ 
            path: path.join( refDir, url ) 
        })

    }, (error) => {
        if (error) console.error( 'Failed to register protocol: ' + name );
        else debug('core:protocol')( 'Success to register protocol: ' + name );
    });
    
}