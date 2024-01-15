export const serenoQuery = {
  getAllSerenos: `
        SELECT id_sereno, dni, nombre, apellidos, genero, celular, correo, direccion, nacimiento, imagen,
            YEAR(CURDATE()) - YEAR(nacimiento) AS edad, fk_patrullaje 
        from sereno;`,
  createSereno: `
        INSERT INTO sereno (dni, nombre, apellidos, genero, celular, correo, direccion, nacimiento) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
  getSerenoById: `
        select id_sereno, dni, nombre, apellidos, genero, celular, correo, direccion, nacimiento, imagen,
            YEAR(CURDATE()) - YEAR(nacimiento) AS edad, fk_patrullaje 
        from sereno 
        where id_sereno = ?`,
  updateSerenoFkPatrullaje: `UPDATE sereno SET fk_patrullaje = ? WHERE id_sereno = ?`,
  updateSerenoById: `
    UPDATE sereno 
    SET dni = ? ,nombre = ? ,apellidos = ? ,genero = ? ,celular = ? ,correo = ? ,direccion = ? ,nacimiento = ?
    WHERE id_sereno = ?;`,
};
