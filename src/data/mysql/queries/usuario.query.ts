export const usuarioQuery = {
  updateMeUser: `
    UPDATE usuario
    SET dni = ?, nombre = ?, apellido = ?, nacimiento = ?, correo = ?,
        direccion = ?, telefono = ?, sexo = ?
    WHERE id_usuario = ?;
    `,
};
