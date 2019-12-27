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

      this.categories.map(category => {
        for (let index = 0; index < size; index++) {
          let x = attribute[Object.keys(attribute)[index]]
          let mean = category.means[Object.keys(category.means)[index]]
          let std = category.std[Object.keys(category.std)[index]]
          attribute[index] = Math.exp(Math.log(this.pdf(x, mean, std)))
          console.log(attribute[index])
        }

        attribute.P =
          attribute[Object.keys(attribute)[0]] *
          attribute[Object.keys(attribute)[1]] *
          attribute[Object.keys(attribute)[2]] *
          attribute[Object.keys(attribute)[3]]
      })
    })

    const sum = x.map(item => item.P).reduce((prev, curr) => prev + curr, 0)

    //console.log(sum)

    x.map(att => (att.pNorm = att.P / sum))

    //  x.map(att => console.log(att))
  }
}
module.exports = NaiveBayes
