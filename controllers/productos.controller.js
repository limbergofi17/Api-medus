import models from "../models";
import Models from "../models";

export default {
  addProduct: async (req, res, next) => {
    try {
      const { nombre, precio, cantidad, descripcion, path, filename } = req.body;

      const agregarProducto = new Models.Producto({
        nombre,
        precio,
        cantidad,
        descripcion
      });

      agregarProducto.filename = req.file.filename;
      agregarProducto.path = 'public/images/' + req.file.filename;

      const agregarP = await agregarProducto.save();
      res.status(200).json(agregarP);
      console.log(req.body);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al guardar en la BD",
      });
      next(error);
    }
  },

  consultarProducto: async (req, res, next) => {
    try {
      const consultarProd = await Models.Producto.find();
      res.json(consultarProd);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al consultar",
      });
      next(error);
    }
  },

  eliminarProducto: async (req, res, next) => {
    try {
      const eliminarPro = await Models.Producto.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json(eliminarPro);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al eliminar",
      });
      next(error);
    }
  },

  updateProducto: async (req, res, next) => {
    try {
      const updateDatos = req.body;
      await Models.Producto.findByIdAndUpdate(req.params.id, {
        ...updateDatos,
        filename: req.file.filename,
        path: 'public/images/' + req.file.filename
      });
      res.json({
        message: "Datos modificados"
      })
    } catch (error) {
      res.status(500).send({
        message: "Error al actualizar"
      })
      next(error);
    }
  },

  consultarOneProduct: async (req, res, next) => {
    try {
      const consultarOne = await Models.Producto.findById(req.params.id);
      if (!consultarOne) {
        res.status(404).send({
          message: "No se encuentra el dato"
        })
      } else {
        res.status(200).json(consultarOne);
      }
    } catch (error) {
      res.status(500).send({
        message: "La consulta no pudo lograrse"
      })
    }
  }
};
