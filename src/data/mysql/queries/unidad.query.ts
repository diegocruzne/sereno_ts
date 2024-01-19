export const unidadQuery = {
  getUnidades: "select * from unidad",
  getUnidadPorId: "SELECT * FROM unidad WHERE id_unidad = ?",
  unidadesAvailables: `
    SELECT unidad.id_unidad,
        CONCAT(tipo_unidad.tipo_unidad, ' - ', unidad.placa) as unidad_list,
        GROUP_CONCAT(patrullaje.id_patrullaje SEPARATOR ', ') AS patrullajes_pertenecientes
    FROM unidad LEFT JOIN patrullaje ON unidad.id_unidad = patrullaje.fk_unidad
        INNER JOIN tipo_unidad ON unidad.fk_tipo_unidad = tipo_unidad.id_tipo_unidad
    GROUP BY unidad.id_unidad, CONCAT(tipo_unidad.tipo_unidad, ' - ', unidad.placa)
    ORDER BY CONCAT(tipo_unidad.tipo_unidad, ' - ', unidad.placa)`,
};
