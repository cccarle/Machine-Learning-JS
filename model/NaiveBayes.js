const {
  dividedByCategory,
  calculateStandardDeviationForEveryProperty,
  calculateMeanForEveryProperty
} = require('./../helpers/helpers')

/* 
Train the data
x = values
y = labels

Calucate and Standard Deviation for every property of the flowers
*/

const fit = (x, y) => {
  let flowerTrainingData = []

  dividedByCategory(flowerTrainingData, x, y)
  calculateMeanForEveryProperty(flowerTrainingData)
  calculateStandardDeviationForEveryProperty(flowerTrainingData)
  console.log(flowerTrainingData[1])
}

module.exports = {
  fit
}
