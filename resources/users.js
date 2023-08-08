const url = 'http://localhost:3500/users/';


async function obtenerUsers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new error('Fallo en la api');
    }
    // const data = await response.json()
    // console.log(data);
    return response.json();

  } catch (error) {
    console.log(error);
  }
}



// Exporta el objeto
module.exports.obtenerUsers = obtenerUsers;

