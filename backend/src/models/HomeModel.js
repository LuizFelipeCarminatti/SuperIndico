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
    },
    { id: true }
)

const Model = mongoose.model('usuarios', HomeSchema)

HomeSchema.path('_id')

module.exports = Model