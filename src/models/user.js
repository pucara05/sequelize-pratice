import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,  // Asumiendo que puede ser null, según la migración
    validate: {
      len: {
        args: [2, 50],
        msg: 'El nombre debe tener entre 2 y 50 caracteres'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,  // Asumiendo que puede ser null, según la migración
    validate: {
      len: {
        args: [2, 50],
        msg: 'El apellido debe tener entre 2 y 50 caracteres'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,  // Asumiendo que puede ser null, según la migración
    unique: true,
    validate: {
      isEmail: {
        msg: 'Debes proporcionar un email válido'
      }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,  // Activa la actualización automática de createdAt y updatedAt
  tableName: 'Users',  // Asegura que use el mismo nombre de tabla que en tu migración
  paranoid: false     // No eliminaciones lógicas a menos que las necesites
});

export default User;
