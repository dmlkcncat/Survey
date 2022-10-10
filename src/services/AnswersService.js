import BaseService from './BaseService'
import Answer from '../models/Answer'
import TextAnswer from '../models/TextAnswer'
import SelectAnswer from '../models/SelectAnswer'

export default class AnswersService extends BaseService {
  constructor() {
    super(Answer)
  }

  list(where = {}) {
    return this.model
      .find(where)
      .populate({
        path: 'survey',
        select: 'title',
      })
      .populate({
        path: 'answers.question',
        populate: 'question',
      })
      .populate('answers.answer')
  }

  async insert(data) {
    const answerListByType = data.answers.reduce(
      (acc, curr) => {
        switch (curr.answerType) {
          case 'text-answer':
            acc.text.push(curr)
            break
          case 'select-answer':
            acc.select.push(curr)
            break
        }
        return acc
      },
      {
        text: [],
        select: [],
      }
    )

    const textAnswer = await TextAnswer.insertMany(answerListByType.text.map((curr) => curr.answer))

    answerListByType.text = answerListByType.text.map((item, index) => {
      return {
        ...item,
        answer: textAnswer[index]._id,
      }
    })

    const selectAnswer = await SelectAnswer.insertMany(
      answerListByType.select.map((curr) => curr.answer)
    )

    answerListByType.select = answerListByType.select.map((item, index) => {
      return {
        ...item,
        answer: selectAnswer[index]._id,
      }
    })

    data.answers = [...answerListByType.text, ...answerListByType.select]

    return this.model(data).save()
  }

  get(where = {}) {
    return this.model
      .findOne(where)
      .populate({
        path: 'survey',
        select: 'title',
      })
      .populate({
        path: 'answers.question',
        populate: 'question',
      })
      .populate('answers.answer')
  }
}
