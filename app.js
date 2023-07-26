import express from 'express';
import bodyParser from 'body-parser'; 
import { getNotes, getNote, createNote, updateNote, deleteNote } from './database.js';

const app = express()

app.use(bodyParser.json());

app.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post("/notes", async (req, res) => {
    const { title, contents } = req.body
    const note = await createNote(title, contents)
    res.status(201).send(note)
})

app.put("/notes/:id", async (req, res) => {
    const id = req.params.id
    const { title, contents } = req.body
    const note = await updateNote(id, title, contents)
    res.send(note)
})

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await deleteNote(id);
        res.send("Note deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while deleting the note.");
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado!')
})

app.listen(8080, () => {
    console.log('Servidor está rodando na porta 8080')
})