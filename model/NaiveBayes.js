const {
  dividedByLabels,
  calculateStandardDeviationForEveryProperty,
  calculateMeanForEveryProperty,
  createObjMeanAndStdValueForEachLabels
} = require('./../helpers/helpers')

/* 
Train the data
x = values
y = labels

Calucate and Standard Deviation for every property of the flowers
*/

class NaiveBayes {
  constructor() {
    this.trainingData = []
    this.labels = []
    this.predictions = []
  }

  fit(x, y) {
    dividedByLabels(this.trainingData, x, y)
    calculateMeanForEveryProperty(this.trainingData)
    calculateStandardDeviationForEveryProperty(this.trainingData)
    createObjMeanAndStdValueForEachLabels(this.trainingData, this.labels)
  }

  predict(x) {
    x.map(dataAttributes => {
      let temp = []
      let size = Object.keys(dataAttributes).length - 1

      this.labels.map((labels, i) => {
        let obj = {}
        for (let index = 0; index < size; index++) {
          let x = dataAttributes[Object.keys(dataAttributes)[index]]
          let mean = labels.means[Object.keys(labels.means)[index]]
          let std = labels.std[Object.keys(labels.std)[index]]
          let cat = labels.labels
          obj[index] = Math.exp(Math.log(this.pdf(x, mean, std)))
          obj.labels = cat
          obj.P =
            obj[Object.keys(obj)[0]] *
            obj[Object.keys(obj)[1]] *
            obj[Object.keys(obj)[2]] *
            obj[Object.keys(obj)[3]]
        }

        temp.push({ labels: obj.labels, PDF: obj, P: obj.P })
      })

      this.getSumOfPScoreAndNormalize(temp)
      const classifed = this.classifyData(temp)
      this.predictions.push(classifed)
    })

    return this.predictions
  }

  pdf(x, mean, std) {
    return (
      (1 / (Math.sqrt(2 * Math.PI) * std)) *
      Math.E ** (-((x - mean) ** 2) / (2 * std ** 2))
    )
  }

  getSumOfPScoreAndNormalize(temp) {
    let sum = temp.map(item => item.P).reduce((prev, curr) => prev + curr, 0) // sum of P
    temp.map(att => (att.p_norm = att.P / sum)) // normalize P
  }

  classifyData(temp) {
    return temp.reduce((prev, current) =>
      prev.p_norm > current.p_norm ? prev : current
    )
  }

  accuracyScore(predictions, y) {
    let counter = 0

    for (let i = 0; i < y.length; i++) {
      if (predictions[i].labels === y[i]) {
        counter++
      }
    }

    let score = counter / predictions.length
    let accuracy =
      (score * 100).toFixed(2) +
      '%' +
      ` (${counter}/${predictions.length} correctly classified)`

    return accuracy
  }
}
module.exports = NaiveBayes
