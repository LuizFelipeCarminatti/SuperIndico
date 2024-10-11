const HomeModel = require('../models/HomeModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

module.exports.saveUsers = async (req, res) => {
    const { nome, email, celular, cpf, city } = req.body

    const password = await bcrypt.hash(req.body.password, 6)

    const saveUsuario = new HomeModel({ nome, email, password, celular, cpf, city })

    const saveResponse = await saveUsuario.save()

    res.json(saveResponse)
}

module.exports.getUsuarios = async (req, res) => {
    const { city } = req.params
    try {
        const users = await HomeModel.find({ city })
        if (!users) {
            res.status(404).send('Nenhum usuário obtido!')
        }
        res.json(users).select('-password').exec()
    } catch (error) {
        console.error(error)
    }
}

module.exports.editarUsuario = async (req, res) => {
    const { id } = req.params

    const { nome, email, password, celular, city, sexo } = req.body

    const response = await HomeModel.findByIdAndUpdate(id, { nome, email, password, celular, city, sexo })

    return res.status(200).json(response)

}

module.exports.deleteUsuario = async (req, res) => {
    const { id } = req.params

    const response = await HomeModel.findByIdAndDelete(id)

    return res.status(200).json(response)
}

module.exports.getUsuario = async (req, res) => {

    try {
        const user = await HomeModel.findById(req.params.id, '-password')

        if (!user) {
            console.log('Usuário não obtido!')
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await HomeModel.findOne({ email })

        if (!user) {
            res.status(400).send('Não autorizado')
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            res.status(401).send('Não autorizado')
        }
        console.log('Usuário validado!')

        try {
            
            const token = JWT.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: process.env.EXPIRES_IN_TOKEN })
            res.cookie('token', token, { httpOnly: false, secure: false })
            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token, user})
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde' })
        }
        
    } catch (error) {
        console.error(error)
    }
}

module.exports.espacoUsuario = async (req, res) => {
    const response = await HomeModel.findById()
    res.status(200).json(response)
}