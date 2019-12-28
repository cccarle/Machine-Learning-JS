/* 
Divied the depening which label they has.
Then add them to an array.
x = values
y = labels
*/

const dividedByLabels = (trainingData, x, y) => {
  let unique = [...new Set(y)]

  unique.map(label => {
    trainingData.push(x.filter(x => label == x[4]))
  })
}

/* 
Calculate Standard Deviation forr every property.
Creates new key value for standard deviation in the array and add the result of the st-calucation.
*/

const calculateStandardDeviationForEveryProperty = trainingData => {
  trainingData.map(data => {
    data.std = {
      [0]: std(
        data.map(dataProperty => dataProperty[0]),
        data.means[0]
      ),
      [1]: std(
        data.map(dataProperty => dataProperty[1]),
        data.means[1]
      ),
      [2]: std(
        data.map(dataProperty => dataProperty[2]),
        data.means[2]
      ),
      [3]: std(
        data.map(dataProperty => dataProperty[3]),
        data.means[3]
      )
    }
  })
}

/* 
Calculation for Standard Deviation.
*/

const std = (arr, mean) => {
  const n = arr.length
  return Math.sqrt(
    arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  )
}

/* 
Calculate Mean/Average for every property.
Creates new key value for mean in the array and add the result of the mean-calucation.
*/

const calculateMeanForEveryProperty = trainingData => {
  trainingData.map(data =>
    mean(
      ...data.map(
        dataProperty =>
          (data.means = {
            '0': dataProperty[0],
            '1': dataProperty[1],
            '2': dataProperty[2],
            '3': dataProperty[3]
          })
      )
    )
  )
}

/* 
Calculation for Mean/Average
*/
const mean = (...numbers) => {
  numbers.reduce((a, b) => a + b) / numbers.length
}

/* 
Create array with objects for each category
*/

const createObjMeanAndStdValueForEachLabels = (trainingData, labels) => {
  trainingData.map((label, i) =>
    labels.push({
      labels: i,
      means: label.means,
      std: label.std
    })
  )
}

/* 
Creates matrixsheet, the structure.
*/
const createMatrixSheet = label => {
  return label.map(() => Array(label.length).fill(0))
}
module.exports = {
  dividedByLabels,
  calculateStandardDeviationForEveryProperty,
  calculateMeanForEveryProperty,
  createObjMeanAndStdValueForEachLabels,
  createMatrixSheet
}
