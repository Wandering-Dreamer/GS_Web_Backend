const express = require('express');
const router = express.Router();
const preferencesModel = require('../models/preferencesModel');

// Endpoint para salvar as preferências do usuário
router.post('/save', (req, res) => {
  const { userId, chargerType, preferredTime } = req.body;

  preferencesModel.savePreferences(userId, chargerType, preferredTime, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao salvar preferências' });
    } else {
      res.status(201).json({ message: 'Preferências salvas com sucesso', id: result.id });
    }
  });
});

// Endpoint para obter as preferências do usuário
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  preferencesModel.getPreferences(userId, (err, preferences) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter preferências' });
    } else if (!preferences) {
      res.status(404).json({ message: 'Preferências não encontradas' });
    } else {
      res.status(200).json(preferences);
    }
  });
});

module.exports = router;