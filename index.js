import fs from "fs";

export default class ProductManager{

    constructor(){
        this.path = "./products.json";
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products)
            return products;
        }
        return []
    }

    addProduct = async (title, description, price, image, stock) => {
        const products = await this.getProducts();
        const product = {
            title: title,
            description: description,
            price: price,
            image: image,
            stock: stock,
        };
        let lastId = products.length !== 0 ? products[products.length - 1].id : 0;
        product.id = ++lastId

        product.title && product.description && product.price && product.image && product.stock
        ? products.push(product) 
        : console.log("Tienes que incluir toda la información de este artículo")

        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return product;
    }

    getProductById = async (id) => {
        let products = await this.getProducts();
        let product = products.find((item) => item.id == id)
        return product ? product : (product = { error: "El producto no existe"});
        // product 
        // ? console.log(`Tu producto es ${product.title}`) 
        // : console.log("Ninguno de tus productos coincide con el ID seleccionado")
    }

    updateProduct = async (id, propiedad, value) => {
        let products = await this.getProducts();
        let product = products.find((item) => item.id === id);
        product[propiedad] = value;

        let index = products.indexOf(product);
        products[index] = product;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        let productoBorrado = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productoBorrado));
    }
}

const productos = new ProductManager();

// // De acá hacia abajo no será tomado en cuenta para este desafío
// const actualizacionDeArray = async () => {

    // // Se aplica método para agregar productos
    // await productos.addProduct(
    //     "Archeops",
    //     "Carta de Pokémon TCG correspondiente a la expansión de Tempestad plateada",
    //     1.49,
    //     "https://i.imgur.com/UKZV1DE.jpg",
    //     3
    // );

    // // Se aplica método para borrar productos
    // await productos.deleteProduct(8);

    // // Se aplica el método updateProduct
    // await productos.updateProduct(1, "price", 4.99)
// };

// actualizacionDeArray();