export const denunciaQuery = {
  getDetalleDenuncias: `
    SELECT id_denuncia, DATE(fecha) AS fecha, DATE_FORMAT(fecha, '%H:%i') AS hora, 
        delito.delito AS delito, persona.dni
    FROM denuncia 
    INNER JOIN delito ON denuncia.delito_fk = delito.id_delito
    LEFT JOIN persona ON denuncia.denunciante_fk = persona.id_persona
    ORDER BY id_denuncia DESC
    LIMIT ?, ?;`,

  getNumTotalDenuncias: `SELECT COUNT(*) AS total FROM denuncia;`,
  getDetallesDelitoByFecha: `
        SELECT id_denuncia, DATE(fecha) AS fecha, DATE_FORMAT(fecha, '%H:%i') AS hora, delito.delito AS delito, persona.dni
        FROM denuncia 
            INNER JOIN delito ON denuncia.delito_fk = delito.id_delito
            LEFT JOIN persona ON denuncia.denunciante_fk = persona.id_persona
        WHERE DATE_FORMAT(fecha, '%d-%m-%y') = ?
        ORDER BY id_denuncia DESC;
    `,

  totalDenunciasByDate: `SELECT COUNT(*) AS total FROM denuncia WHERE DATE_FORMAT(fecha, '%d-%m-%y') = ?;`,
};
