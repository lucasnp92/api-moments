import Comment from '#models/comment'
import Moment from '#models/moment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  public async store({ request, params, response }: HttpContext) {
    const body = request.body()
    const momentId = params.momentId

    await Moment.findOrFail(momentId)

    body.momentId = momentId
    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'Comentário adicionado com sucesso!',
      data: comment,
    }
  }
}
