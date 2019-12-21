// x = values, y = labels
const fit = (x, y) => {
  let flowerTrainingData = []

  dividedFlowerSetByCategory(flowerTrainingData, x, y)
  calculateMeanForEveryFlowerProperty(flowerTrainingData)
  calculateStandardDeviationForEveryFlowerProperty(flowerTrainingData)
  console.log(flowerTrainingData[2])
}

const calculateStandardDeviationForEveryFlowerProperty = flowerTrainingData => {
  flowerTrainingData.map(flower => {
    ;(flower.sepal_length_st = st(
      flower.map(flowerProperty => flowerProperty.sepal_length),
      flower.sepal_length_mean
    )),
      (flower.sepal_width_st = st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.sepal_width_mean
      )),
      (flower.petal_length_st = st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.petal_length_mean
      )),
      (flower.petal_width = st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.petal_width_mean
      ))
  })
}

const st = (arr, mean) => {
  const n = arr.length

  return Math.sqrt(
    arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  )
}

const dividedFlowerSetByCategory = (flowerTrainingData, x, y) => {
  y.map(label => {
    flowerTrainingData.push(x.filter(x => x.species == label))
  })
}

const calculateMeanForEveryFlowerProperty = flowerTrainingData => {
  flowerTrainingData.map(flower =>
    mean(
      ...flower.map(
        flowerProperty => (
          (flower.sepal_length_mean = flowerProperty.sepal_length),
          (flower.sepal_width_mean = flowerProperty.sepal_width),
          (flower.petal_length_mean = flowerProperty.petal_length),
          (flower.petal_width_mean = flowerProperty.petal_width)
        )
      )
    )
  )
}

const mean = (...numbers) =>
  numbers.reduce((acc, val) => acc + val, 0) / numbers.length

module.exports = {
  fit
}
