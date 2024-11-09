import userModel from '../models/userModels.js';
import { hash, compare } from 'bcrypt';


class registerController{


  static createUsers = async (req, res) => {
    // Convierte users de string a objeto
    console.log('full body',req.body)
    // Convierte users de string a objeto
    let users;
    if (typeof req.body.users === 'string') {
       // Convierte users de string a objeto si viene de form-data
       try {
           users = JSON.parse(req.body.users || '[]');
       } catch (error) {
           return res.status(400).json({ error: 'Invalid JSON format for users' });
       }
   } else {
       // Si ya es un array (JSON puro)
       users = req.body.users || [];
   }

   // const imagePath = req.files && req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null;

    console.log('usuarios',users);

    if (!Array.isArray(users)) {
        return res.status(400).json({ error: 'Users must be an array' });
    }

    const errors = [];
    const createdUsers = [];
    const usersToInsert = [];


    try {

        for (const user of users) {
            const { name, apellido, cedula, email, password,rol } = user;
            if (!name || !apellido || !email || !password) {
                errors.push({ error: 'Nombre, apellido, correo y contraseña son requeridos', user });
                continue; // Cambiado para seguir insertando otros usuarios
            }

            if (password.length < 7) {
                errors.push({ error: 'La contraseña debe tener al menos 7 caracteres', user });
                continue; // Cambiado para seguir insertando otros usuarios
            }

            const existingUser = await userModel.findByCedula(cedula);

            console.log('existe',existingUser)

            if (existingUser) {
                errors.push({ error: 'El usuario ya existe', name });
                continue; // Cambiado para seguir insertando otros usuarios
            }

            const imagePath = req.files[0] ? req.files[0].originalname : null; // Solo el nombre del archivo

            console.log('imagen',imagePath)

            const hashedPassword = await hash(password, 10);

            usersToInsert.push({
                name,
                apellido,
                cedula,
                email,
                password:hashedPassword,
                rol,
                imagen:imagePath
            });
        }

        console.log('users to insert',usersToInsert)
        if (usersToInsert.length > 0) {
            // Llama a la función de inserción de múltiples usuarios en el modelo
            const result = await userModel.addMultipleUsers(usersToInsert);
            createdUsers.push(...usersToInsert.map(user => ({ name: user.nombre }))); // Solo agregar nombres
        }

        if (errors.length > 0) {
            res.status(400).json({ errors });
        } else {
            res.status(201).json({ createdUsers });
        }

    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


}

export default registerController;