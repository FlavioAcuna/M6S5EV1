const axios = require("axios");
const fs = require("fs");

//API base url
const BASE_URL = "https://jsonplaceholder.typicode.com";

//Funcion solicitud y guardar data
async function fetchData(endpoint) {
  try {
    //Solicitud HTTP a la API
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    //obtener datos
    const data = response.data;
    //Guardar datos en archivo
    fs.writeFile(`${endpoint}.txt`, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error("Error al escribir el archivo:", err.message);
      } else {
        console.log(`Datos guardados en ${endpoint}.txt`);
      }
    });
  } catch (error) {
    console.error(console.error("Error al obtener los datos:", error.message));
  }
}

//Funcion Principal
async function main() {
  // Obtener el argumento desde la línea de comandos
  const args = process.argv.slice(2);
  //Validar argumento
  const validEnpoint = ["comments", "photos", "albums", "todos", "posts"];
  if (args.length === 0 || !validEnpoint.includes(args[0])) {
    console.log(
      "Debes proporcionar un endpoint válido: comments, photos, albums, todos, posts"
    );
    return;
  }
  const endpoint = args[0];
  // Llamar a la función para obtener y guardar los datos
  await fetchData(endpoint);
}
main();
