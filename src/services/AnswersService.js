import BaseService from './BaseService'
import Answer from '../models/Answer'
import TextAnswer from '../models/TextAnswer'
import SelectAnswer from '../models/SelectAnswer'
import RateAnswer from '../models/RateAnswer'
import Survey from '../models/Survey'

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
          case 'rate-answer':
            acc.rate.push(curr)
            break
        }
        return acc
      },
      {
        text: [],
        select: [],
        rate: [],
      }
    )

    const survey = await Survey.findById(data.survey).populate({
      path: 'questions',
      populate: {
        path: 'question',
      },
    })
    console.log(survey)

    //Denetimler

    survey.questions.forEach((question) => {
      if (question.questionType === 'text') {
        if (question.required) {
          const existingAnswer = answerListByType.text.find(
            (text) => text.question !== question._id
          )
          if (!existingAnswer) {
            throw new Error('Tüm soruları cevapla')
          }
        }
      } else if (question.questionType === 'select') {
        if (question.required) {
          const existingAnswer = answerListByType.select.find(
            (select) => select.question !== question._id
          )
          if (!existingAnswer) {
            throw new Error('Tüm soruları cevapla')
          }
        }
      } else if (question.questionType === 'rate') {
        if (question.required) {
          const existingAnswer = answerListByType.rate.find(
            (rate) => rate.question !== question._id
          )
          if (!existingAnswer) {
            const rateAnswer = answerListByType.rate.find(
              (x) => x.question === question._id.toString()
            )
            if (rateAnswer.answer.matrix.length !== question.question.rowOptions.length)
              throw new Error('Tüm soruları cevapla')
          }
        }
      }
    })

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

    const rateAnswer = await RateAnswer.insertMany(answerListByType.rate.map((curr) => curr.answer))
    answerListByType.rate = answerListByType.rate.map((item, index) => {
      return {
        ...item,
        answer: rateAnswer[index]._id,
        // rowOptions: rateAnswer[index]._id,
      }
    })

    data.answers = [...answerListByType.text, ...answerListByType.select, ...answerListByType.rate]

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
