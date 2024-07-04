import type { HttpContext } from '@adonisjs/core/http'
import Moment from '#models/moment'
// import app from '@adonisjs/core/services/app'
// import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async index({ response }: HttpContext) {
    const moments = await Moment.query().preload('comments')
    return response.status(200).json({
      data: moments,
    })
  }

  public async store({ request, response }: HttpContext) {
    const body = request.body()
    const image = request.file('image', this.validationOptions)

    if (image) {
      if (image.tmpPath) {
        const imageBuffer = fs.readFileSync(image.tmpPath)
        const base64Image = imageBuffer.toString('base64')
        body.image = base64Image
      } else {
        return response.status(400).send({ error: 'Image upload failed' })
      }
    }

    const moment = await Moment.create(body)
    await moment.save()

    return {
      message: 'Momento criado com sucesso!',
      data: moment,
    }
  }

  public async show({ params }: HttpContext) {
    const moment = await Moment.findOrFail(params.id)
    await moment.load('comments')
    return {
      data: moment,
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const body = request.body()
    const moment = await Moment.findOrFail(params.id)

    moment.title = body.title
    moment.description = body.description

    if (moment.image !== body.image || !moment.image) {
      const image = request.file('image', this.validationOptions)
      if (image) {
        if (image.tmpPath) {
          const imageBuffer = fs.readFileSync(image.tmpPath)
          const base64Image = imageBuffer.toString('base64')
          moment.image = base64Image
        } else {
          return response.status(400).send({ error: 'Image upload failed' })
        }
      }
    }
    await moment.save()

    return {
      message: 'Momento atualizado com sucesso!',
      data: moment,
    }
  }

  async destroy({ params }: HttpContext) {
    const moment = await Moment.findOrFail(params.id)
    await moment.delete()
    return {
      message: 'Momento excluído com sucesso!',
      data: moment,
    }
  }
}
