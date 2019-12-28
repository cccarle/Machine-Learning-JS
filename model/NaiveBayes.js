const {
  dividedByCategory,
  calculateStandardDeviationForEveryProperty,
  calculateMeanForEveryProperty,
  createObjMeanAndStdValueForEachCategory
} = require('./../helpers/helpers')

/* 
Train the data
x = values
y = labels

Calucate and Standard Deviation for every property of the flowers
*/

class NaiveBayes {
  constructor() {
    this.x = []
    this.y = []
    this.flowerTrainingData = []
    this.sum = []
    this.categories = []
    this.predictions = []
  }

  fit(x, y) {
    dividedByCategory(this.flowerTrainingData, x, y)
    calculateMeanForEveryProperty(this.flowerTrainingData)
    calculateStandardDeviationForEveryProperty(this.flowerTrainingData)
    createObjMeanAndStdValueForEachCategory(
      this.flowerTrainingData,
      this.categories
    )
  }

  pdf(x, mean, std) {
    return (
      (1 / (Math.sqrt(2 * Math.PI) * std)) *
      Math.E ** (-((x - mean) ** 2) / (2 * std ** 2))
    )
  }

  predict(x) {
    x.map(attribute => {
      let size = Object.keys(attribute).length - 1

      this.categories.map((category, i) => {
        let obj = {}
        for (let index = 0; index < size; index++) {
          let x = attribute[Object.keys(attribute)[index]]
          let mean = category.means[Object.keys(category.means)[index]]
          let std = category.std[Object.keys(category.std)[index]]
          let cat = category.category
          obj[index] = Math.exp(Math.log(this.pdf(x, mean, std)))

          obj.category = cat
          obj.P =
            obj[Object.keys(obj)[0]] *
            obj[Object.keys(obj)[1]] *
            obj[Object.keys(obj)[2]] *
            obj[Object.keys(obj)[3]]
        }

        this.sum.push({ label: obj.category, PDF: obj, P: obj.P })
      })

      const sum = this.sum
        .map(item => item.P)
        .reduce((prev, curr) => prev + curr, 0) // sum of P

      this.sum.map(att => (att.p_norm = att.P / sum)) // normalize

      const classifed = this.sum.reduce((prev, current) =>
        prev.p_norm > current.p_norm ? prev : current
      )

      this.predictions.push(classifed)
    })

    return this.predictions
  }

  accuracyScore(predictions, y) {}
}
module.exports = NaiveBayes
