const txt = document.querySelector('#txt');
const { datos } = require('../index');

txt.innerHTML = `${datos.nombres}`;