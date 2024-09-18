import User from '../models/user.js';
import sequelize from '../config/database.js';



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
    try {
      const newUser = await User.create({ firstName, lastName, email });
      console.log('Usuario creado exitosamente:', newUser);
      res.status(201).json(newUser);
    } catch (dbError) {
      console.error('Error al crear el usuario:', dbError);
      res.status(400).json({ error: 'Error al crear el usuario' });
    }

  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ error: 'Error del servidor' });
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

// obtener todos los usuarios 
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los usuarios', error });
  }
};


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
      res.status(201).json(user);
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


