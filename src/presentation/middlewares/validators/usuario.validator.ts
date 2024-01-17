import { check } from "express-validator";
import { expressValidatorAdapter } from "../../../config/express-validator.adapter";

export const usuarioValidator = {
  validateChangePass: [
    check("oldPass", "El password es obligatorio").not().isEmpty(),
    check("newPass", "Es requerida su nueva contraseña").not().isEmpty(),
    check("newPass", "Debe de ser de más de 6 digitos").isLength({ min: 6 }),
    check("confirmPass", "Debe ingresar su contraseña nueva dos veces").not().isEmpty(),
    check("confirmPass", "Las contraseñas no coinciden").custom(
      (confirmPass, { req }) => {
        if (confirmPass !== req.body.newPass) {
          throw new Error("Contraseñas incorrectas");
        }
        return true;
      }
    ),

    expressValidatorAdapter,
  ],
};
