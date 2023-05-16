/* eslint-disable no-unused-vars */
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

import { Colaborador } from './models/UserModel.js'
import { Chamado } from './models/ChamadoModel.js'

import bcrypt from 'bcryptjs'
import { HttpStatusCode } from 'axios'
import jwt from 'jsonwebtoken'
import { eAdmin } from './middlewares/auth.js'

import bodyParser from 'body-parser'

const app = express()

// ...

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ...

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage })

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER, Content-Type, Authorization',
  )
  app.use(cors())
  next()
})

app.get('/', eAdmin, async (req, res) => {
  return res.json({
    erro: false,
    mensagem: 'listagem de usuário',
    id_usuario_logado: req.userId,
  })
})

// ...

app.use(express.urlencoded({ extended: true }))

// ...

app.post('/login', async (req, res) => {
  const user = await Colaborador.findOne({
    attributes: ['id', 'nome', 'password'],
    where: {
      nome: req.body.nome,
    },
  })

  if (user === null) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem: 'Usuário ou senha incorretos!',
    })
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem: 'Usuário ou senha incorretos!',
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    'laj20rqmfpajfç3jgçmalei0492494',
    {
      expiresIn: 600,
    },
  )

  return res.json({
    erro: false,
    mensagem: 'Login realizado com sucesso!',
    token,
  })
})

app.post('/login/cadastro', async (req, res) => {
  const data = req.body

  const nome = data.nome
  const email = data.email
  const ramal = data.ramal
  const funcao = data.funcao
  const setor = data.setor
  const password = await bcrypt.hash(data.password, 8)

  Colaborador.create({
    nome,
    email,
    ramal,
    funcao,
    setor,
    password,
  })
})

app.post('/abrir-chamado', upload.array('image'), async (req, res) => {
  const data = req.body
  const dataImg = req.files
  const titulo = data.titulo
  const categoria = data.categoria
  const descricao = data.descricao
  const image = dataImg[0]?.filename

  const chamado = await Chamado.create({
    titulo,
    categoria,
    descricao,
    image,
  })

  return res.json(chamado)
})

app.get('/chamado/:id', async (req, res) => {
  const id = req.params.id

  const chamado = await Chamado.findByPk(id)

  if (chamado) {
    return res.json(chamado)
  } else {
    return res.status(HttpStatusCode.NotFound).json({
      erro: true,
      mensagem: 'Chamado não encontrado',
    })
  }
})

app.listen(8181, function (erro) {
  if (erro) {
    console.log('erro')
  } else {
    console.log('Servidor iniciado com sucesso!')
  }
})
