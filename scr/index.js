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

let query = 'SELECT * FROM despachohs LIMIT 50 ';

function enviarDatos() {
    let datos = [] 
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let datos = row;
        mainWindow.webContents.send('carga', datos);

    });
    query = 'SELECT DISTINCT cliente FROM electron_crud.despachohs ORDER BY cliente ASC';
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let clientes = row;
        mainWindow.webContents.send('carga2', clientes);

    });

    query = 'SELECT DISTINCT proveedor FROM electron_crud.materiales ORDER BY proveedor ASC';
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let proveedor = row;
        mainWindow.webContents.send('carga3', proveedor);

    });
    query = 'SELECT DISTINCT nombre FROM electron_crud.proveedores ORDER BY nombre ASC';
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let proveedor = row;
        mainWindow.webContents.send('carga4', proveedor);


    });
    query = 'SELECT DISTINCT nombre FROM electron_crud.proveedores WHERE Material = "flete" ORDER BY nombre ASC';
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let proveedor = row;
        mainWindow.webContents.send('carga5', proveedor);


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

ipcMain.on('borrado', (e, id, tabla) => {
    console.log('Borrando dato! ' + id + ' de ' + tabla);
    let query = 'DELETE FROM ' + tabla + ' WHERE Id = ' + id;
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        console.log('Borrado!');
        enviarDatos();
    });
});

ipcMain.on('actualizar', (e, sql) => {
    console.log('Actualizando dato! ' + sql);
    let query = sql
    conexion.query(query, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        console.log('Borrado!');
        enviarDatos();
    });
});

ipcMain.on('guardar', (e, datos, tabla) => {
    console.log('Guardando = ' + datos);
    let query = 'INSERT INTO ' + tabla + ' set ?';
    console.log('SQL = ' + query);
    conexion.query(query, [datos], (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        console.log('Guardado!');
        if (tabla == 'despachohs'){
            enviarDatos();
        }
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

ipcMain.on('filtrar', (e, sql, sqlCuenta) => {
    //console.log('Fechas = ' + consulta1 + ' ' + consulta2);
    //if (consulta == '') {
    //enviarDatos();
    //} else {
    //let query = 'SELECT * FROM despachohs WHERE fecha BETWEEN "' + consulta1 + '" AND "' + consulta2 + '"';
    sql += ' LIMIT  0,  50;'
    console.log('SQL = ' + sql);
    conexion.query(sql, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        console.log('OK')
        mainWindow.webContents.send('filtro', row);
    });
    //}
    conexion.query(sqlCuenta, (err, row) => {
        if (err) {
            console.log('Hubo un error: ');
            console.log(err);
            return;
        }
        let datos = row;
        mainWindow.webContents.send('cuenta', datos);
    
        console.log('Cuenta!');
        console.log('*******************************');
        console.log(datos[0]);
        console.log('-------------------------------');
    });
});

ipcMain.on('pagina', (e, sql) => {
        let query = sql;
        console.log('SQL = ' + query);
        conexion.query(query,(err, row) => {
            if (err) {
                console.log('Hubo un error: ');
                console.log(err);
                return;
            }
            console.log('******************************');
            console.log('Paginas Cargadas');
            console.log('------------------------------');
            mainWindow.webContents.send('paginacarga', row);
        });
});

ipcMain.on('encontrar', (e, sql) => {
    console.log('Procesando = ' + sql);
        let query = sql;
        conexion.query(query, (err, row) => {
            if (err) {
                console.log('Hubo un error: ');
                console.log(err);
                return;
            }
            console.log('******************************');
            console.log(row);
            console.log('------------------------------');
            mainWindow.webContents.send('encontro', row);
        });
});





