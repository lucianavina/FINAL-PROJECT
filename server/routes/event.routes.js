const express = require("express")
const router = express.Router()

const Event = require("../models/Event.model")


//CREAR EVENTO
router.post('/', (req, res) => {

    const { title, description, participants, eventDate } = req.body
    Event
        .create({title, description, participants, eventDate, creator: req.user.id})
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//RECUPERAR EVENTOS 
router.get("/", (req, res, next) => {
    Event
        .find()
        .populate('creator')
        .populate('participants')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//RECUPERAR UN SOLO EVENTO
router.get('/:id',(req, res) => {
    Event
        .findById(req.params.id)
        .populate('creator')
        .populate('participants')
        .then((response) => res.json(response))
        .catch((err) => next(err))
})

//EDITAR EVENTO
router.put("/:id", (req, res, next) => {
    Event
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => res.json(response), req.body)
        .catch((err) => next(err))
})

//BORRAR EVENTO
router.delete("/:id", (req, res, next) => {
        Event.findByIdAndRemove(req.params.id)
        .then((response) => res.json(response))
        .catch((err) => console.log("BBDD error", err))
})

module.exports = router