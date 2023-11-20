import models from "../models";
import Models from "../models";

export default {
  addPerson: async (req, res, next) => {
    try {
      const { nombre, precio, cantidad, descripcion, path, filename } = req.body;

      const agregarPersona = new Models.Persona({
        nombre,
        precio,
        cantidad,
        descripcion
      });

      agregarPersona.filename = req.file.filename;
      agregarPersona.path = 'public/images/' + req.file.filename;

      const agregarP = await agregarPersona.save();
      res.status(200).json(agregarP);
      console.log(req.body);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al guardar en la BD",
      });
      next(error);
    }
  },

  consultarPersona: async (req, res, next) => {
    try {
      const consultarPerso = await Models.Persona.find();
      res.json(consultarPerso);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al consultar",
      });
      next(error);
    }
  },

  eliminarPersona: async (req, res, next) => {
    try {
      const eliminarPer = await Models.Persona.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json(eliminarPer);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error al eliminar",
      });
      next(error);
    }
  },

  updatePersona: async (req, res, next) => {
    try {
      const updateDatos = req.body;
      await Models.Persona.findByIdAndUpdate(req.params.id, {
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

  consultarOnePerson: async (req, res, next) => {
    try {
      const consultarOne = await Models.Persona.findById(req.params.id);
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