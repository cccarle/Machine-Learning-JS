const neatCsv = require('neat-csv')
const fs = require('fs')
const iris_path = './iris.csv'

/* 
Convert CSV-file to an array of objects with the content from the CSV-file.
*/

const iris_data = async () => {
  let irisData = await neatCsv(fs.createReadStream(iris_path), {
    separator: ','
  })

  const iris_setosa = irisData.filter(flower => flower.species == 'Iris-setosa')

  iris_setosa.map(flower => (flower.species = 0))

  const iris_versicolor = irisData.filter(
    flower => flower.species == 'Iris-versicolor'
  )

  iris_versicolor.map(flower => (flower.species = 1))

  const iris_virginica = irisData.filter(
    flower => flower.species == 'Iris-virginica'
  )

  iris_virginica.map(flower => (flower.species = 2))

  let intLabeledFlowers = iris_setosa
    .concat(iris_versicolor)
    .concat(iris_virginica)

  convertStringValuesToFloats(intLabeledFlowers)

  const labels = intLabeledFlowers.map(flower => flower.species)

  return { intLabeledFlowers, labels }
}

/* 
Convert String values to floats.
*/

const convertStringValuesToFloats = intLabeledFlowers => {
  intLabeledFlowers.map(
    flower => (
      (flower.sepal_length = parseFloat(flower.sepal_length)),
      (flower.sepal_width = parseFloat(flower.sepal_width)),
      (flower.petal_length = parseFloat(flower.petal_length)),
      (flower.petal_width = parseFloat(flower.petal_width))
    )
  )
}

module.exports = {
  iris_data
}
