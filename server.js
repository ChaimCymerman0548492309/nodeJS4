
// import express from 'express'
// import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// import bcrypt from "bcrypt";

// const people = [
//     { id: uuidv4(), email: 'john@example.com',  password: "1111"},
//     { id: uuidv4(), email: 'jane@example.com',  password: "2222"},
//     { id: uuidv4(), email: 'bob@example.com', password: "3333" }
// ];



// const app = express()
// app.use(express.json());

// app.get('/', (req, res) => {

//     res.send(people);
// })



// const port = 3000
// app.listen(port, () => {

//     console.log(`Server is up and running on port:${port}`);

// })


// app.get('/user/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     // Find the user id
//     const user = people.find(person => person.id === id);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ user });
// });


// app.post('/user', (req, res) => {
//     const { id, email, password } = req.body;
//     const newUser = {
//         id: uuidv4(),
//         email: email,
//         password: password

//     }
//     people.push(newUser);
//     res.status(201).json(newUser);
// });


// app.put('/user/:id', (req, res) => {
//     const userId = parseInt(req.params.id)
//     const updateUser = req.body
//     const index = people.findIndex(person => person.id === userId);

//     if (index !== -1) {
//         people[index] = { ...people[index], ...updateUser, id: userId };
//         res.json(people[index]);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// });

// app.delete('/user/:id', (req, res) => {
//     const userId = parseInt(req.params.id)
//     const updateUser = req.body
//     const index = people.findIndex(person => person.id === userId);

//     if (index !== -1) {
//         const deletedUser = people.splice(index, 1);
//         res.json(deletedUser[0]);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// }
// )


// app.post('/checkUser', (req, res) => {
//     const { email, password } = req.body;
//     const user = arr.find(item => item.email === email && item.password === password);
//     if (user) {
//         res.json({ message: 'User exists' });
//     } else {
//         res.json({ message: 'User does not exist' });
//     }
// });


// app.post('/user/:email', async (req, res) => {
//     const userEmail = req.params.email;
//     const userIndex = arr.findIndex(item => item.email === userEmail);
//     if (userIndex === -1) {
//         const { email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10); 
//         const newUser = { email, passwordHash: hashedPassword };
//         arr.push(newUser);
//         res.send('User registered');
//     } else {
//         res.send('User already exists');
//     }
// });




import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

const people = [
    { id: uuidv4(), email: 'john@example.com',  password: "1111"},
    { id: uuidv4(), email: 'jane@example.com',  password: "2222"},
    { id: uuidv4(), email: 'bob@example.com', password: "3333" }
];

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(people);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = people.find(person => person.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
});

app.post('/user', (req, res) => {
    const { email, password } = req.body;
    const newUser = {
        id: uuidv4(),
        email: email,
        password: password
    };
    people.push(newUser);
    res.status(201).json(newUser);
});

app.put('/user/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;
    const index = people.findIndex(person => person.id === userId);

    if (index !== -1) {
        people[index] = { ...people[index], ...updateUser, id: userId };
        res.json(people[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/user/:id', (req, res) => {
    const userId = req.params.id;
    const index = people.findIndex(person => person.id === userId);

    if (index !== -1) {
        const deletedUser = people.splice(index, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.post('/checkUser', (req, res) => {
    const { email, password } = req.body;
    const user = people.find(item => item.email === email && item.password === password);
    if (user) {
        res.json({ message: 'User exists' });
    } else {
        res.json({ message: 'User does not exist' });
    }
});
app.post('/user/:email', async (req, res) => {
    const userEmail = req.params.email;
    const user = people.find(item => item.email === userEmail);
    if (!user) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = { id: uuidv4(), email, passwordHash: hashedPassword };
        people.push(newUser);
        res.send('User registered');
    } else {
        res.send('User already exists');
    }
});

