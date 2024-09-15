const express = require("express");
const users = require("./users.json")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/users', (req, res) => {
    try {
        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!(typeof name === 'string'
            && typeof email === 'string'
            && typeof password === 'string'
            && name.length > 5
            && name.length < 10
            && password.length > 7
            && password.length < 10
        )) {
            res.status(401).send("Not correct data");
        }

        const id = users[users.length - 1].id + 1;
        const newUser = {id, name, email, password};

        users.push(newUser);
        res.status(201).send(newUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (typeof userId !== "number" || isNaN(userId)) {
            return res.status(404).send('Not correct userId');
        }

        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.put('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (typeof userId !== "number" || isNaN(userId)) {
            return res.status(404).send('Not correct userId');
        }

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }
        const {name, email, password} = req.body;

        if (!(typeof name === 'string'
            && typeof email === 'string'
            && typeof password === 'string'
            && name.length > 5
            && name.length < 10
            && password.length > 7
            && password.length < 10
        )) {
            res.status(401).send("Not correct data");
        }


        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = password;
        res.status(201).send(users[userIndex]);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (typeof userId !== "number" || isNaN(userId)) {
            return res.status(404).send('Not correct userId');
        }

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }
        users.splice(userIndex, 1);
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});