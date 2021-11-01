const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

let data = [
  { id: 1, name: 'Minecraft', year: 2011 },
  { id: 2, name: 'LOL', year: 2015 },
];


// Code

app.listen(PORT, () => {
  console.log(`server isch am laufe!!! http://localhost:${PORT}`);
});

// GET /game => return all
// GET /game/1 => return one
// POST /game => create
// PUT /game => update
// DELETE /game => delete
