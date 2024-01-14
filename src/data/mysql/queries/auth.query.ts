export const authQuery = {
  findUserByDni: `SELECT id_usuario, dni, contrasena, id_tipo_us 
    FROM usuario inner join tipo_usu on usuario.fk_tipo_us = tipo_usu.id_tipo_us 
    WHERE dni = ?`,
  findUserById: `select id_usuario, dni, nombre, apellido, nacimiento, correo, 
    direccion, telefono, sexo, adicional, foto, fk_tipo_us  
    from usuario where id_usuario = ?`,
};
