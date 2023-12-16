const ACCESS_TOKEN =
  "ya29.a0AfB_byDatoBduQPvK_b9kiwSxnHdsjHC_4-wXyVng0JnlKMMhDd3wIjDgfoCSOcqaEn9im3UUkAZvQr3_3VmVSeFkgss_-xjiK8Rhdee9We30a4eILPlTI1IciXEiYVrCvEZ6YqEKM0Ue6-_xMgmeTouBAOqL6unQplIaCgYKAWgSARMSFQHGX2MirZIPGh7KmIpFA_GtadfAZg0171";
 
const SHEET_ID = '1eOMyC1_9xb7O95cTh8SJq5J9gCagVkyc7bdzg0Bjqtc';

//Inicializamos la fecha a la fecha de hoy
function onRegistrarCliente() {
  // Obtenemos los datos del formulario
  const nombre = document.getElementById('Nombre').value;
  const fechaRegistro = document.getElementById('fechaRegistro').value;
  const domicilio = document.getElementById('domicilio').value;
  const sexo = document.getElementById('Sexo').value;
  const pagocuota = document.getElementById('PagoCuota').value;
  const edad = document.getElementById('Edad').value;

  // Creamos el JSON que espera nuestra API
  let data = {};
  let values = [];
  let fila = [nombre, sexo, edad, domicilio, fechaRegistro, pagocuota];
  values.push(fila);

  // Verificar que coincida con el nombre de la hoja de nuestro sheet
  data.range = "clientes";
  data.majorDimension = "ROWS";
  data.values = values;

  // Invocamos al método POST de la API
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/clientes:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data),
    }
  ).then(function (response) {
    // Maneja la respuesta aquí según sea necesario
    response.json().then(function (responseData) {
      console.log('Respuesta de la API:', responseData);
    });
  });

  //AGREGADO NUEVO DESDE ACA, SIRVE PARA MOSTRAR LO DEL SHEETS

// Crear un nuevo div para mostrar la información
var clienteDiv = document.createElement("div");

// Agregar contenido al nuevo div
clienteDiv.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Sexo:</strong> ${sexo}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Domicilio:</strong> ${domicilio}</p>
    <p><strong>Fecha de registro:</strong> ${fechaRegistro}</p>
    <p><strong>Pago de cuota:</strong> ${pagocuota}</p>

`;
clienteDiv.style.marginBottom = "50px";
// Obtener el div existente "lista-clientes"
var listaClientesDiv = document.getElementById("lista-clientes");

// Agregar el nuevo div al div existente
listaClientesDiv.appendChild(clienteDiv);

  // Limpiamos los campos del formulario para permitir cargar un nuevo gasto
  document.getElementById('Nombre').value = "";
  document.getElementById('fechaRegistro').value = "";
  document.getElementById('domicilio').value = "";
  document.getElementById('Sexo').value = "";
  document.getElementById('PagoCuota').value = "";
  document.getElementById('Edad').value = "";
};