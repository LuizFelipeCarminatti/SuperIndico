const mongoose = require('mongoose')
const { Schema } = mongoose

const HomeSchema = new Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        celular: { type: String, required: true },
        cpf: { type: String, required: true },
        city: { type: String, required: true },
        sexo: { type: String, require: false },
        idade: { type: String, require: false },
        estrela5: { type: Number, require: false },
        estrela4: { type: Number, require: false },
        estrela3: { type: Number, require: false },
        estrela2: { type: Number, require: false },
        estrela1: { type: Number, require: false },
        messages: [{ message: String }]
    },
    { id: true }
)

const Model = mongoose.model('usuarios', HomeSchema)

HomeSchema.path('_id')

module.exports = Model