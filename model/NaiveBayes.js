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
      var size = Object.keys(attribute).length - 1

      this.categories.map((category, i) => {
        for (let index = 0; index < size; index++) {
          let x = attribute[Object.keys(attribute)[index]]
          let mean = category.means[Object.keys(category.means)[index]]
          let std = category.std[Object.keys(category.std)[index]]
          attribute[index] = this.pdf(x, mean, std)
        }
        console.log(attribute)
      })
    })
  }
}
module.exports = NaiveBayes
