const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql');

if (process.env.NODE_ENV !== "production") {
    require('electron-reload')(__dirname, {
        //electron: path.join(__dirname, '../node_modules','.bin','electron')
    });
};

let mainWindow = null;

const conexion = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'luiscanalest',
    database: 'electron_crud'
})

conexion.connect((err) => {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

let query = 'SELECT * FROM despachohs';

function enviarDatos() {
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let datos = row;
        mainWindow.webContents.send('carga', datos);
        
        console.log('Datos cargados!');
        console.log('*******************************');
        console.log(datos);
        console.log('-------------------------------');
    });
};

app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1200,
        height: 800,
    });
    mainWindow.loadURL(`file://${__dirname}/views/index.html`);
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();

        enviarDatos();
    });
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('borrado', (e, id) => {
    console.log('Borrando dato! ' + id);
    let query = 'DELETE FROM despachohs WHERE Id = ?';
    conexion.query(query, [id], (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        console.log('Borrado!');
        enviarDatos();
    });
});

ipcMain.on('guardar', (e, datos) => {
    console.log('Guardando = ' + datos);
    let query = 'INSERT INTO despachohs set ?';
    conexion.query(query, [datos], (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        console.log('Guardado!');
        enviarDatos();
    });
});

const templateMenu = [
    {
        label: 'DevTools',
        submenu: [
            {
                label: 'Mostar ocultar DevTools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    }
]

ipcMain.on('buscar', (e, consulta) => {
    console.log('Buscando = ' + consulta);
    if (consulta == '') {
        enviarDatos();
    } else {
        let query = 'SELECT * FROM despachohs WHERE cliente = ?';
        conexion.query(query, consulta, (err, row) => {
            if (err) {
                console.log('Hubo un error: ');
                console.log(err);
                return;
            }
            console.log('******************************');
            console.log(row);
            console.log('------------------------------');
            mainWindow.webContents.send('busqueda', row);
        });
    }
});





