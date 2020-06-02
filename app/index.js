const express = require('express');

app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db = require('./models/index');

Game = db.game;

app.get('/games', async (req, res) => {
    res.status(200).json(await Game.findAll());
});

app.get('/games/:id', async (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        const game = await Game.findByPk(id);

        if (game != undefined) {
            res.status(200).json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post('/games', async (req, res) => {
    var { title, price, year } = req.body;

    Game.build({title, price, year}).save().then((game) => {
        res.status(200).json(game);
    })
    .catch(() => {
        res.sendStatus(500);
    });
});

app.delete("/games/:id", async (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        const game = await Game.findByPk(id);

        if (game == undefined) {
            res.sendStatus(404);
        } else {
            try {
                await game.destroy();
                res.sendStatus(200);  
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        }
    }
});

app.put("/games/:id", async (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        let game = await Game.findByPk(id);

        if (game != undefined) {
            
            const { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            try {
                game.save();
                res.status(200).json(game);
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }

        } else {
            res.sendStatus(404);
        }
    }
});

app.listen(45678, () => {
   console.log("A API está sendo executada!"); 
});