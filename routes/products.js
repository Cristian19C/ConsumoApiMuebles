const express = require('express')
const path = require('path');
const fs = require('fs');
const router = express.Router()
const multer = require('multer');

// Configurar Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/'); // Aquí debes especificar la carpeta donde se guardarán las imágenes subidas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {obtenerProducts, addProduct, deleteProduct, findById, updateProduct} = require('../resources/products');
const { log } = require('console');


router.get('/', (req, res) => res.render('public/index', {'title': 'Pagina inicio'}))

router.get('/contactenos', (req, res) => res.render('public/contactenos', {'title': 'Contactenos'}))

//login

router.get('/admin',  async (req, res) => {
  const products = await obtenerProducts()
  res.render('administrator/index', {'title': 'Administrador', 'data':products.data})
})

router.get('/products', async (req, res) => {
  const products = await obtenerProducts()
  res.render('public/products', {'title': 'Productos', 'data':products.data})
})

router.get('/asientos', async (req, res) => {
  const products = await obtenerProducts()
  res.render ('public/asientos', {'title': 'Asientos', 'data':products.data})
})

router.get('/sofas', async (req, res) => {
  const products = await obtenerProducts()
  res.render ('public/sofas', {'title': 'Sofas', 'data':products.data})
})

router.get('/muebles', async (req, res) => {
  const products = await obtenerProducts()
  res.render ('public/muebles', {'title': 'Muebles', 'data':products.data})
})
router.get('/login', async (req, res) => {
  const products = await obtenerProducts()
  res.render ('public/login', {'title': 'Login', 'data':products.data})
})

router.get('/agregar', async(req, res) => {
  console.log('agregar');
  const products = await obtenerProducts()
  res.render('administrator/addProducts', {'title': 'Agregar productss', 'data':products.data})
})

router.get('/details/:id', async(req, res) => {
  
  console.log('detalles producto');
  const id_product = req.params.id;
  const productoDetails = await findById(id_product)
    
    // console.log(productoDetails);
  res.render ('public/details', {'title': 'Detalles producto','data':productoDetails.data })
  console.log('detalles producto');

});


router.post('/add', upload.single('brand'), async(req,res)=>{
      
    const {id_product, name, price, description, category} = req.body

    const image = req.file;
    // if (!image) {
    //   return res.status(400).send('Debes subir una imagen');
    // }
    // Agregar el nuevo registro al objeto 'data'
      data = {
      id_product: id_product, 
      name: name,
      price: Number(price),
      description: description,
      category: category,
      image: image.filename
    };
    console.log(data);
    const addProducto = await addProduct(data)

    
    res.redirect('/admin')
})

router.get('/:id', async(req, res) => {
  
  console.log('entri');
    const id_product = req.params.id;
    // console.log(id_product);
    const productofind = await findById(id_product)
    
    console.log(productofind);
    res.render('administrator/updateProducts', {'title': 'Actualizar registros','data':productofind.data })

});


router.post('/update/:id',upload.single('brand'), async(req, res) => {
  console.log('hola update');
  const id = req.params.id;
  // console.log(id);
  const product = await findById(id)
  console.log(product);
  console.log('yes');
  const {id_product, name, price, description, category} = req.body
  let image =null;
  
  
if (req.file !== undefined) {
  image = req.file.filename;
  const imagePath = path.join('public/img/', product.data.image);
    console.log(imagePath);
    fs.unlinkSync(imagePath);
} else {
  image = product.data.image;
  console.log(image);
}
 

    
    // Agregar el nuevo registro al objeto 'data'
    data = {
      id_product: id_product, 
      name: name,
      price: Number(price),
      description: description,
      category: category,
      image: image
    };
    console.log(data);
    const updateProducto = await updateProduct(data,id)

    
    res.redirect('/admin')


});

router.get('/delete/:id', async(req, res) => {
    
  console.log('borrar');
        const id_product = req.params.id;
        const productofind = await findById(id_product)
        // productofind.data

        console.log(productofind.data.image);

        // console.log(id_product);
        
        const imagePath = path.join('public/img/', productofind.data.image);
        console.log(imagePath);
        fs.unlinkSync(imagePath);
      const producto = await deleteProduct(id_product) 
    res.redirect('/admin')

});





module.exports = router
