
import userModel from "./user.model.js";
import {comparePass, encryptPass} from '../../../utils/cryptPass.js'
import {genToken, TokenValidation} from '../../../utils/Authentication.js'
import userTypeModel from "../UserTypes/userType.model.js";

export const selectUser = async (req, res) => {
    try {
        const users = await userModel.findAll({
          include: [
            userTypeModel
          ]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error
        });
    }
}

export const insertUsers = async (req, res) => {
    try {
        const {
            fullName,
            address,
            email,
            phoneNumber,
            userTypeId,
            password
        } = req.body;

        if(!fullName || !address || !email || !password ||
          !phoneNumber || !userTypeId
        ) {
          return res.status(401).json({
            message: "Faltan datos para la insercon del usuario"
          })
        }

        const validateEmail = await userModel.findOne({
          where: {
            email,
            status: 0
          }
        })

        if (validateEmail){
          return res.status(400).json({
            message: 'el correo ya exta registrado'
          })
        }

        const newUser = {
            fullName,
            address,
            email,
            phoneNumber,
            userPassword : await encryptPass(password),
            userTypeId,
            status: 0
        }

        const user = await userModel.create(newUser);

        return res.status(200).json({
            message: `usuario creado con exito ${fullName}`,
            data: user
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: 'error insertando el usuario'
        })
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Se verifica que el nombre de ususario este registrado en la base de datos
      const user = await userModel.findOne({
        where: { email, status: 0 },
        include : [
          userTypeModel
        ]
          });
      if (!user) {
        return res.status(404)
          .json({
            message: 'El usuario no existe'
          });
      }
      // se compara la contrasenia de la base de datos con la contrasenia ingresada
      const isMatch = await comparePass(password, user.userPassword);
      if (!isMatch) {
        return res.status(401)
          .json({
            message: 'La contraseña es incorrecta',
          });
      }
       // al mandar el usuario evitar enviar la contrasenia
       user.password = undefined;
      // se genera el json Web Token
      const token = genToken(user);
     
      return res.json({
        token,
        user
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };

  
export const validationToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación.' });
  }
  try {
    const validation = TokenValidation(token);
    if (validation === true) {
      return res.status(200).json({ message: 'El token es válido.' });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'El token es inválido.' });
  }
  return res.status(401).json({ message: 'El token es inválido.' });
};