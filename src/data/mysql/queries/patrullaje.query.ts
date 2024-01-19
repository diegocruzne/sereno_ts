export const patrullajeQuery = {
  getPatrullajes: `
    SELECT * 
    FROM patrullaje 
    WHERE fk_turno = ? AND fk_unidad = ?`,
  newPatrullaje: `
    INSERT INTO patrullaje (descripcion, fk_turno, fk_unidad) 
    VALUES (?, ?, ?)`,
  getDetailsPatrullaje: `
    SELECT id_patrullaje, patrullaje.descripcion, turno.turno, unidad.placa, tipo_unidad.tipo_unidad,
        CASE
            WHEN patrullaje.estado = 1 THEN 'Activo'
            WHEN patrullaje.estado = 0 THEN 'Inactivo'
        END AS estado
    FROM patrullaje INNER JOIN turno ON patrullaje.fk_turno = turno.id_turno
        INNER JOIN unidad ON patrullaje.fk_unidad = unidad.id_unidad
        INNER JOIN tipo_unidad ON unidad.fk_tipo_unidad = tipo_unidad.id_tipo_unidad
    WHERE id_patrullaje = ?`,
  getDetailsPatrullaje2: `
    SELECT patrullaje.id_patrullaje, patrullaje.descripcion, turno.turno, tipo_unidad.tipo_unidad, unidad.placa,
      fecha_creacion, COUNT(sereno.id_sereno) as num_sere 
    FROM patrullaje LEFT JOIN sereno ON patrullaje.id_patrullaje = sereno.fk_patrullaje 
      INNER JOIN turno ON patrullaje.fk_turno = turno.id_turno 
      INNER JOIN unidad ON patrullaje.fk_unidad = unidad.id_unidad 
      INNER JOIN tipo_unidad ON unidad.fk_tipo_unidad = tipo_unidad.id_tipo_unidad 
    GROUP BY patrullaje.id_patrullaje, patrullaje.descripcion, turno.turno, tipo_unidad.tipo_unidad, unidad.placa, fecha_creacion 
    ORDER BY num_sere;`,
  getDetailsPatrullaje3: `
  SELECT id_patrullaje, patrullaje.descripcion, turno.turno, unidad.placa, tipo_unidad.tipo_unidad,
    CASE
      WHEN patrullaje.estado = 1 THEN 'Activo'
      WHEN patrullaje.estado = 0 THEN 'Inactivo'
    END AS estado, 
    COUNT(sereno.id_sereno) AS num_sere
  FROM patrullaje LEFT JOIN sereno ON patrullaje.id_patrullaje = sereno.fk_patrullaje
    INNER JOIN turno ON patrullaje.fk_turno = turno.id_turno
    INNER JOIN unidad ON patrullaje.fk_unidad = unidad.id_unidad
    INNER JOIN tipo_unidad ON unidad.fk_tipo_unidad = tipo_unidad.id_tipo_unidad
  GROUP BY id_patrullaje, patrullaje.descripcion, turno.turno, unidad.placa, tipo_unidad.tipo_unidad, estado
  ORDER BY num_sere ASC;`,
};
