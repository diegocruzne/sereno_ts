export const delitoQuery = {
  getDelitoPorCategorias: `
    SELECT td.tipo_delito AS tipo_delito, d.id_delito AS id, d.delito AS nombre
    FROM tipo_delito td JOIN delito d ON td.id_tipo_delito = d.tipo_delito_fk;`,
};
