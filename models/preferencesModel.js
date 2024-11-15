const db = require('../db/database'); // Certifique-se de que está importando corretamente o banco de dados

// Função para salvar preferências do usuário
function savePreferences(userId, chargerType, preferredTime, callback) {
    const query =`INSERT INTO preferences (user_id, charger_type, preferred_time) VALUES (?, ?, ?)`;
    
    db.run(query, [userId, chargerType, preferredTime], function (err) {
      if (err) {
        console.error('Erro ao salvar preferências:', err); // Log do erro completo
        return callback(err); // Passa o erro completo para a callback
      }
      callback(null, { id: this.lastID }); // Retorna o ID do novo registro
    });
  }

// Função para obter as preferências do usuário
function getPreferences(userId, callback) {
  const query = `
    SELECT charger_type, preferred_time 
    FROM preferences 
    WHERE user_id = ? 
    ORDER BY id DESC LIMIT 1
  `;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Erro ao buscar preferências:', err); // Log para debugging
      return callback(err);
    }
    callback(null, row);
  });
}

// Exportar as funções
module.exports = {
  savePreferences,
  getPreferences
};