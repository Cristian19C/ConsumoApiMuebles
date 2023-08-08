const url = 'http://localhost:3500/products/';


async function obtenerProducts() {
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

async function findById(id_product) {
  try {
    // console.log(id_product);
    const response = await fetch(url+id_product);
    if (!response.ok) {
      throw new Error('Fallo en la api  findById');
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}


async function addProduct(material){
  try {
    
    const response = await fetch(url, {method:'POST', headers: {'Content-type': 'application/json'}, body:JSON.stringify(material)});
    if(!response){
      throw new error('Fallo en la api');
    }

  } catch (error) {
    console.log(error);
    
  }
}

async function updateProduct(producto,id){
  try {
    // console.log(datos);
    const response = await fetch(url+id, {method:'put', headers: {'Content-type': 'application/json'}, body:JSON.stringify(producto)});
    if(!response){
      throw new error('Fallo en la api');
    }

  } catch (error) {
    console.log(error);
    
  }
}

async function deleteProduct(id){
  try {
    // console.log(datos);
    const response = await fetch(url+id, {method:'DELETE'});
    if(!response){
      throw new error('Fallo en la api');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    
  }
}




// Exporta el objeto Map
module.exports.obtenerProducts = obtenerProducts;
module.exports.addProduct = addProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.findById = findById;
module.exports.updateProduct = updateProduct;
