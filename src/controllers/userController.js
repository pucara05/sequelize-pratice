import User from '../models/user.js';
import sequelize from '../config/database.js';





// Crear usuario
export const createUser = async (req, res) => {
  try {
    console.log('Solicitud recibida en /api/users');

    // Verificar la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos verificada.');

    const { firstName, lastName, email } = req.body;

    // Validar los datos de entrada
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Se requieren firstName, lastName y email' });
    }

    // Crear nuevo usuario
    const newUser = await User.create({ firstName, lastName, email });
    console.log('Usuario creado exitosamente:', newUser);
    return res.status(201).json(newUser);

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      console.error('Error de validación:', error);
      return res.status(400).json({ error: 'Datos de entrada inválidos' });
    }
    console.error('Error general:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};




/*
// Crear usuario
export const createUser = async (req, res) => {
  try {
    console.log('Solicitud recibida en /api/users');

    // Verificar la conexión a la base de datos
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos verificada.');
    } catch (dbError) {
      console.error('Error de conexión a la base de datos:', dbError);
      return res.status(500).json({ error: 'Error de conexión a la base de datos' });
    }

    const { firstName, lastName, email } = req.body;

    // Crear nuevo usuario
    const newUser = await User.create({ firstName, lastName, email });
    console.log('Usuario creado exitosamente:', newUser);

    // Enviar respuesta de éxito
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(400).json({ error: error.message });
  }
};
*/


// Obtener todos los usuarios con paginación básica
export const getUsers = async (req, res) => {
  // Parámetros de paginación
  const page = req.query.page || 1; // Página actual (por defecto 1)
  const limit = req.query.limit || 10; // Número de usuarios por página (por defecto 10)

  // Calcular cuántos usuarios saltar (offset)
  const offset = (page - 1) * limit;

  try {
    // Obtener usuarios con Sequelize
    const users = await User.findAll({
      limit: parseInt(limit),  // Limitar el número de resultados
      offset: parseInt(offset), // Saltar usuarios según la página
      attributes: ['id', 'firstName', 'lastName', 'email'] // Solo traer campos necesarios
    });

    // Comprobar si no hay usuarios y devolver array vacío
    if (!users || users.length === 0) {
      return res.status(200).json([]);  // Devolver array vacío si no hay usuarios
    }

    res.status(200).json(users); // Enviar usuarios como respuesta si existen

  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};



/*
// Obtener todos los usuarios con paginación básica
export const getUsers = async (req, res) => {
  // Parámetros de paginación
  const page = req.query.page || 1; // Página actual (por defecto 1)
  const limit = req.query.limit || 10; // Número de usuarios por página (por defecto 10)

  // Calcular cuántos usuarios saltar (offset)
  const offset = (page - 1) * limit;

  try {
    // Obtener usuarios con Sequelize
    const users = await User.findAll({
      limit: parseInt(limit),  // Limitar el número de resultados
      offset: parseInt(offset), // Saltar usuarios según la página
      attributes: ['id', 'firstName', 'lastName', 'email'] // Solo traer campos necesarios
    });

    res.json(users); // Enviar usuarios como respuesta

  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};
*/




// obtener un usuario por Id

export const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(user){
      res.status(201).json(user);
    }else {
      res.status(404).json({message:'usuario no encontrado',});
    }

  } catch (error) {
    res.status(400).json({message: 'error al buscar usuario por Id',Error});
  }
};


// actualizar usuario 

export const udapteUser = async (req, res) => {
  try {
    const {id} = req.params;
    const {firstName, lastName, email} = req.body;
    const user = await User.findByPk(id);
    if(user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();
      res.status(200).json(user);
    }else{
      res.status(404).json({message: 'usuario no encontrado'});
    }
  } catch (error) {
    res.status(404).json({message: 'Error al actualizar el usuario',error});
    
  }
};



// Eliminar un usuario

export const deleteUser = async (req, res) => {
  try {
    // Convertir id a número
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({message: 'usuario no encontrado'});
    }
  } catch (error) {
    res.status(404).json({message: 'Error al eliminar el usuario', error});
  }
};


