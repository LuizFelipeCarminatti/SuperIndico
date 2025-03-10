require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const debug = require('debug')('http')
const { createServer } = require('node:http')
const server = createServer(app)
const { Server } = require('socket.io')
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        },
        connectionStateRecovery: {}
    }
)

const HomeModel = require('./src/models/HomeModel')

mongoose.connect(process.env.CONNECTION)
    .then(() => {
        app.emit('Executando')
    })
    .catch(error => console.error(error))

const cors = require('cors')
const port = normalizePort(process.env.PORT || '8080')
const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csurf = require('csurf')
const { checkCsurfError, csurfMiddleware } = require('./src/middlewares/middlewares')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const sessionOptions = session({
    secret: '1cbe716f-c302-4171-82cb-a74097fc05e8',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1,
        httpOnly: true,
        secure: false
    }
})

app.use(sessionOptions)
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET, PUT, POST, OPTIONS, DELETE'
}))
app.use(helmet())
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrcAttr: ["'unsafe-inline'"], // Apenas se necessário (melhor evitar)
            scriptSrcElem: [
                "'self'", // Permite scripts locais
                "'unsafe-inline'", // Apenas se necessário (melhor evitar)
                'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', // CDN do axios
                'http://localhost:3000/assets/js/app.js' // Seu script local
            ]
        }
    }
}));
app.use(flash())
app.use(express.urlencoded({ extended: true }))
app.use('/frontend', express.static(path.resolve(__dirname, 'build')))
app.use(csurf())
app.use(checkCsurfError)
app.use(csurfMiddleware)
app.use('/', routes)
app.on('error', onError)
app.on('listening', onListening)

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    const addr = app.address()
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port
    debug('Listening on' + bind)
}

const users = []

io.on('connection', (socket) => {
    console.log('Conectado', socket.id)

    socket.on('join', async (data) => {

        io.in(data.id).socketsLeave(data.id);

        if (data && data.id) {
            users.push({
                socketId: socket.id,
                userId: data.id,
                nome: data.nome
            })
            
            const user = await HomeModel.findById(data.id)
            
            user.messages.map(async (message) => {
                if (message) {
                    await socket.emit('new-requested-services', { message: message.message })
                    await HomeModel.updateMany({ _id: user._id }, { $pull: { messages: { message: message.message } } })
                }
                return
            })

            socket.join(data.id);

        } else {
            console.error("Dados de usuário inválidos na conexão");
        }
    });

    socket.on('request-services', (dados) => {
        const user = users.find(user => user.socketId === socket.id)
    
        if (!user) {
            console.error("User ID não encontrado para este socket.");
            return;
        }
        const message = `Nova solicitação de seus serviços do cliente: ${user.nome}`

        const id = dados.id;

        const salvarMensagem = async () => {
            if (users.find(user => user.userId === id)) {
                io.to(id).emit('new-requested-services', { message });
            } else {
                await HomeModel.findByIdAndUpdate(id, { $push: { messages: { message: message } }})
            }
        }
        salvarMensagem()

    });

    socket.on('disconnect', () => {
        delete users[socket.id]
        console.log(`Usuário ${socket.id} desconectou.`)
    });
});

app.on('Executando', () => {
    server.listen(port, () => {
        console.log(`Executando na porta ${port}`)
    })
})