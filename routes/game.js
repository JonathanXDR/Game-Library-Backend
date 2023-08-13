const express = require('express');
const uuid = require('uuid');
const authenticateToken = require('../middlewares/auth.js');
const Game = require('../models/Game.js');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const allGames = await Game.findAll();
  res.json(allGames);
});

router.get('/:id', authenticateToken, async (req, res) => {
  const game = await Game.findOne({ where: { id: req.params.id } });
  if (!game) {
    return res.status(404).send('Game not found');
  }
  res.json(game);
});

router.post('/', authenticateToken, async (req, res) => {
  const { name, year, rating } = req.body;
  const createdGame = await Game.create({
    id: uuid.v4(),
    name,
    year,
    rating
  });
  res.json(createdGame);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { name, year, rating } = req.body;
  const foundGame = await Game.findOne({ where: { id: req.params.id } });
  foundGame.update({ name, year, rating });
  res.json(await foundGame.save());
});

router.delete('/:id', authenticateToken, async (req, res) => {
  await Game.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
