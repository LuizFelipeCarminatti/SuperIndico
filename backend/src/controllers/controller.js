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
        const users = await HomeModel.find({ city }, '-password')
        if (!users) {
            res.status(404).send('Nenhum usuário obtido!')
        }
        res.json(users)
    } catch (error) {
        console.error(error)
    }
}

module.exports.editarUsuario = async (req, res) => {
    const { id } = req.params

    const { nome, email, password, celular, city, sexo, idade } = req.body

    const response = await HomeModel.findByIdAndUpdate(id, { nome, email, password, celular, city, sexo, idade })

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
        
        res.status(200).json({
            _id: user._id,
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            city: user.city,
            celular: user.celular,
            sexo: user.sexo || "",
            idade: user.idade,
        })
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
            console.log('Não autorizado')
        }
        console.log('Usuário validado!')
        try {
            let tempo = 10 * 24 * 60 * 60 * 1000
            const token = JWT.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: tempo })
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
    const response = await HomeModel.findById(res.userID)
    res.status(200).json(response)
}

module.exports.logout = (req, res) => {
    res.clearCookie('token')
    res.json({ msg: 'Logout realizado com sucesso' })
}

module.exports.getPrimeirosUsuario = async (req, res) => {
    try {
        const users = await HomeModel.find().limit(6)
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
}

module.exports.perfil = async (req, res) => {
    try {
        const user = await HomeModel.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
}

