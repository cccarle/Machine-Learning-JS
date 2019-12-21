/* 
Divied the depening which label they has.
Then add them to an array.
x = values
y = labels
*/

const dividedByCategory = (flowerTrainingData, x, y) => {
  y.map(label => {
    flowerTrainingData.push(x.filter(x => x.species == label))
  })
}

/* 
Calculate Standard Deviation forr every property.
Creates new key value for standard deviation in the array and add the result of the st-calucation.
*/

const calculateStandardDeviationForEveryProperty = flowerTrainingData => {
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

/* 
Calculation for Standard Deviation.
*/

const st = (arr, mean) => {
  const n = arr.length

  return Math.sqrt(
    arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  )
}

/* 
Calculate Mean/Average for every property.
Creates new key value for mean in the array and add the result of the mean-calucation.
*/

const calculateMeanForEveryProperty = flowerTrainingData => {
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

/* 
Calculation for Mean/Average
*/
const mean = (...numbers) =>
  numbers.reduce((acc, val) => acc + val, 0) / numbers.length

module.exports = {
  dividedByCategory,
  calculateStandardDeviationForEveryProperty,
  calculateMeanForEveryProperty
}
