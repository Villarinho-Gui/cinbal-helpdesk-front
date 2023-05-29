import { NextFunction, Request, Response, Express } from 'express'
import { HttpStatusCode } from 'axios'

import { PrismaClient } from '@prisma/client'

interface FileData {
  id: number
  url: string
}

interface HelpDeskData {
  id: number
  title: string
  category: string
  description: string
  files: FileData[]
  createdAt: Date
}

export class HelpDeskController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, category, description }: HelpDeskData = req.body
      const files: Express.Multer.File[] = req.files as Express.Multer.File[]

      const prisma = new PrismaClient()

      const createdFiles = files.map((file: Express.Multer.File) => ({
        id: req.params.id,
        url: file.path,
      }))

      const callHelpDesk = await prisma.call.create({
        data: {
          title,
          category,
          description,
          files: {
            create: createdFiles,
          },
          createdAt: new Date(),
        },
      })

      res.status(HttpStatusCode.Accepted).json({
        callHelpDesk,
        error: false,
        message: 'Chamado aberto com sucesso!',
      })
    } catch (error) {
      console.error(error)

      next(error)
      res.status(HttpStatusCode.BadRequest).json({
        error: true,
        message: 'Ocorreu um erro ao tentar abrir o chamado',
      })
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const prisma = new PrismaClient()

      const callHelpDesk = await prisma.call.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          files: true,
        },
      })
      if (callHelpDesk) {
        return res.status(HttpStatusCode.Accepted).json({
          callHelpDesk,
          error: false,
          message: 'Chamado encontrado com sucesso!',
        })
      }
    } catch (error) {
      console.error(error)
      next(error)
      return res.status(HttpStatusCode.NotFound).json({
        erro: true,
        mensagem: 'Chamado não encontrado',
      })
    }
  }

  async findAll(_: Request, res: Response, next: NextFunction) {
    const prisma = new PrismaClient()

    try {
      const allCallHelpDesk = await prisma.call.findMany()
      return res.status(HttpStatusCode.Accepted).json({
        allCallHelpDesk,
        error: false,
        message: 'Foram encontrado todos os chamados com sucesso!',
      })
    } catch (error) {
      console.error(error)
      next(error)
      return res.status(HttpStatusCode.BadRequest).json({
        error: true,
        message: 'Falha ao listar os chamados',
      })
    }
  }
}
