const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const authenticateToken = require('../middlewares/auth.js');
const Game = require('../models/Game.js');

router.get('/', authenticateToken, async (req, res) => {
  const allGames = await Game.findAll();
  res.json(allGames);
});

router.post('/', authenticateToken, async (req, res) => {
  const createdGame = await Game.create({
    id: uuid.v4(),
    name: req.body.name,
    year: req.body.year,
    rating: req.body.rating,
  });

  res.json(createdGame);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const foundGame = await Game.findOne({ where: { id: req.params.id } });

  foundGame.update({
    name: req.body.name,
    year: req.body.year,
    rating: req.body.rating,
  });

  await foundGame.save();
  res.sendStatus(200);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // delete game where id = req.params.id
  await Game.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

router.get('/:id', authenticateToken, async (req, res) => {
  const game = await Game.findOne({ where: { id: req.params.id } });

  if (!game) {
    res.status(404).send('Game not found');
  } else {
    res.json(game);
  }
});

module.exports = router;
