import BaseService from './BaseService'
import Survey from '../models/Survey'
import Text from '../models/Text'
import Select from '../models/Select'
import Question from '../models/Question'

export default class SurveysService extends BaseService {
  constructor() {
    super(Survey)
  }

  list(where = {}) {
    return this.model
      .find(where)
      .populate({
        path: 'questions',
        populate: {
          path: 'question',
        },
      })
      .populate('logo')
  }

  async insert(data) {
    const questionListByType = data.questions.reduce(
      (acc, curr) => {
        switch (curr.questionType) {
          case 'text':
            acc.text.push(curr)
            break
          case 'select':
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

    const textQuestions = await Text.insertMany(
      questionListByType.text.map((curr) => curr.question)
    )
    questionListByType.text = questionListByType.text.map((item, index) => {
      return {
        ...item,
        question: textQuestions[index]._id,
      }
    })

    const selectQuestions = await Select.insertMany(
      questionListByType.select.map((curr) => curr.question)
    )
    questionListByType.select = questionListByType.select.map((item, index) => {
      return {
        ...item,
        question: selectQuestions[index]._id,
      }
    })

    data.questions = [...questionListByType.text, ...questionListByType.select]

    const questions = await Question.insertMany(data.questions)

    data.questions = questions.map((item) => item._id)

    return this.model(data).save()
  }
}
