import Products from '../models/products.models.js';
import {unlink} from 'fs';
import path from 'path';

//funcion para obtener todos los productos
export const getProducts = async (req,res)=>{
    try{
        const products = await Products.find({user: req.user.id});
        res.json(products);
    }catch(error){
        console.log(error);
        res.status(500).json({message:['Error al obtener los productos']})
    }
};//fin de obtener productos

//funcion para crear un producto
export const createProduct = async (req,res)=>{
    try {
        if(!req.file.filename){
            return res.status(500).json({message:['Error al crear unn producto, no se encontro la imagen']})
        }
        const { name, price, year} = req.body;
        const newProduct = new Products ({
            name,
            price,
            year,
            image: req.file.filename,
            user: req.user.id
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al crear un producto']});
    }
};//fin de crear producto

//funcion para obtener un producto
export const getProduct = async (req,res)=>{
    try {
        const product = await Products.findById(req.params.id).populate('user');
        if(!product)
            return res.status(404).json({message:['Producto no encontrado']});
        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:['Error al obtener producto']})             
    }
};//fin de obtener producto

//funcion para eliminar un producto
export const deleteProduct = async (req,res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']});
        //obtenemos la imagen del producto eliminado
        const image = product.image;

        //se necesita buscar el archivo fisico para eliminarlo
        const ruta = path.resolve('./src/public/img')+"/"+image;
        unlink(ruta,(err)=>{
            if(err)
                return res.status(404).json({message: ['Error al eliminar la imagen']})
        })
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al eliminar el producto']});
    }
};//fin de eliminar producto

//funcion para editar un producto
export const editProduct = async (req,res)=>{
    try {
        const product = await Products.findByIdAndUpdate(req.params.id);
        if(!product)
            return res.status(404).json({message:['Producto no actualizado']});
        res.json(product);     
    } catch (error) {
        console.log(error);
        res.status(500).json({message:['Error al editar producto']})              
    }
};//fin de editar producto

//funcion para actualizar un producto
export const updateProduct = async (req,res) =>{
    try {
        //obtenemos la imagen actualizada del producto
        if(!req.file.filename){
            console.log("No se encontro la imagen");
            return res.status(500).json({message: ['Error al actualizar un producto, no se encontro la imagen']})
        }
        const data = ({
            name: req.body.name,
            descripcion: req.body.descripcion,
            price: req.body.price,
            cantidad:req.body.cantidad,
            image:req.file.filename,
            user: req.user.id
        });
        const product = await Products.findByIdAndUpdate(req.params.id, data);
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']});
        const image = product.image;

        //se necesita buscar el archivo fisico para eliminarlo
        const ruta = path.resolve('./src/public/img')+"/"+image;
        unlink(ruta,(err)=>{
            if(err)
                return res.status(404).json({message: ['Error al eliminar la imagen del producto actualizado']})
        })
        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: ['Error al actualizar un producto']})       
    }
}//fin de updateProduct

export const updateProductNoUpdateImage = async (req,res)=>{
    try {
        const data= ({
            name: req.body.name,
            price:req.body.price,
            year: req.body.year,
            image: req.body.image,
            user: req.user.id
        });
        const product = await Products.findByIdAndUpdate(req.params.id, data);
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']});
        return res.json(product)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: ['Error al actualizar un producto']})      
    }
}//fin de updateProduct

