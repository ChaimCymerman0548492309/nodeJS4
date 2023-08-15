
import express from 'express'
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const people = [
    { id: 1, email: 'john@example.com', name: 'John Doe' },
    { id: 2, email: 'jane@example.com', name: 'Jane Smith' },
    { id: 3, email: 'bob@example.com', name: 'Bob Johnson' }
];



const app = express()
app.use(express.json());

app.get('/', (req, res) => {

    res.send(people);
})



const port = 3008
app.listen(port, () => {

    console.log(`Server is up and running on port:${port}`);

})


app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Find the user id
    const user = people.find(person => person.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
});


app.post('/user', (req, res) => {
    const {id , email ,name } = req.body;
    const newUser = {
        id: uuidv4(),
        email: email,
        name: name

    }
    people.push(newUser);
    res.status(201).json(newUser);
});


app.put('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const updateUser = req.body
    const index = people.findIndex(person => person.id === userId);

    if (index !== -1) {
        people[index] = { ...people[index], ...updateUser, id: userId };
        res.json(people[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const updateUser = req.body
    const index = people.findIndex(person => person.id === userId);

    if (index !== -1) {
        const deletedUser = people.splice(index, 1);
        res.json(deletedUser[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
)




