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
    flower.std = {
      sepal_length_st: st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.means.sepal_length_mean
      ),
      sepal_width_st: st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.means.sepal_width_mean
      ),
      petal_length_st: st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.means.petal_length_mean
      ),
      petal_width_st: st(
        flower.map(flowerProperty => flowerProperty.sepal_length),
        flower.means.petal_width_mean
      )
    }
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
        flowerProperty =>
          (flower.means = {
            sepal_length_mean: flowerProperty.sepal_length,
            sepal_width_mean: flowerProperty.sepal_width,
            petal_length_mean: flowerProperty.petal_length,
            petal_width_mean: flowerProperty.petal_width
          })
      )
    )
  )
}

/* 
Calculation for Mean/Average
*/
const mean = (...numbers) =>
  numbers.reduce((acc, val) => acc + val, 0) / numbers.length

const createObjMeanAndStdValueForEachCategory = (
  flowerTrainingData,
  categories
) => {
  flowerTrainingData.map((category, i) =>
    categories.push({
      category: i,
      means: category.means,
      std: category.std
    })
  )
}

module.exports = {
  dividedByCategory,
  calculateStandardDeviationForEveryProperty,
  calculateMeanForEveryProperty,
  createObjMeanAndStdValueForEachCategory
}
