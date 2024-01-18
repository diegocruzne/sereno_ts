export const usuarioQuery = {
  updateMeUser: `
    UPDATE usuario
    SET dni = ?, nombre = ?, apellido = ?, nacimiento = ?, correo = ?,
        direccion = ?, telefono = ?, sexo = ?
    WHERE id_usuario = ?;`,
  updateUserFromRoot: `
    UPDATE usuario SET dni = IFNULL(?, dni), nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), nacimiento = IFNULL(?, nacimiento), 
      correo = IFNULL(?, correo), direccion = IFNULL(?, direccion), 
      telefono = IFNULL(?, telefono), sexo = IFNULL(?, sexo), contrasena = IFNULL(?, contrasena), fk_tipo_us = IFNULL(?, fk_tipo_us) 
    WHERE id_usuario = ?;`,
  verifyExistDataUser: `
      SELECT id_usuario 
      FROM usuario 
      WHERE dni = ? OR correo = ? OR telefono = ?`,
  createUser: `
    INSERT INTO usuario (dni, nombre, apellido, nacimiento, contrasena, correo, direccion, telefono, sexo, adicional, foto, fk_tipo_us)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user.png', 3)
  `,
  getUserById: `
    SELECT id_usuario, dni, contrasena, fk_tipo_us 
    FROM usuario 
    WHERE id_usuario = ?`,
  updatePass: `
      UPDATE usuario 
      SET contrasena = ? 
      WHERE id_usuario = ?`,
  getAllUsers: `
    SELECT id_usuario, dni, nombre, apellido, nacimiento, contrasena, correo, 
      direccion, telefono, sexo, adicional, foto, fk_tipo_us 
    FROM usuario;`,
  getUserById2: `
    SELECT id_usuario, dni, nombre, apellido, nacimiento, contrasena, 
      correo, direccion, telefono, sexo, adicional, foto, fk_tipo_us
    FROM usuario
    WHERE id_usuario = ?;`,
  getUserByDni: `
    SELECT id_usuario, dni, nombre, apellido, nacimiento, contrasena, 
      correo, direccion, telefono, sexo, adicional, foto, fk_tipo_us
    FROM usuario
    WHERE dni = ?`,
};
