const neatCsv = require('neat-csv')
const fs = require('fs')
const iris_path = './iris.csv'
const bank_path = './banknote_authentication.csv'

/* 
Convert CSV-file to an array of objects with the content from the CSV-file.
*/

const iris_data = async () => {
  let iris_data = []

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

  convertFlowerPropertiesToFloats(intLabeledFlowers, iris_data)

  const labels = iris_data.map(flower => flower[4])

  return { iris_data, labels }
}

/* 
Replace flowerproperty with ints.
*/

const convertFlowerPropertiesToFloats = (intLabeledFlowers, iris_data) => {
  intLabeledFlowers.map((flower, i) =>
    iris_data.push({
      '0': parseFloat(flower.sepal_length),
      '1': parseFloat(flower.sepal_width),
      '2': parseFloat(flower.petal_length),
      '3': parseFloat(flower.petal_width),
      '4': flower.species
    })
  )
}

/* 
Convert CSV-file to an array of objects with the content from the CSV-file.
*/

const bank_data = async () => {
  let bank_data = []

  let bankData = await neatCsv(fs.createReadStream(bank_path), {
    separator: ','
  })

  convertBankPropertiesToFloats(bankData, bank_data)

  const labels = bank_data.map(bank_property => bank_property[4])

  return { bank_data, labels }
}

const convertBankPropertiesToFloats = (bank, bank_data) => {
  bank.map((bank_property, i) =>
    bank_data.push({
      '0': parseFloat(bank_property['variance of Wavelet Transformed image']),
      '1': parseFloat(bank_property['skewness of Wavelet Transformed image']),
      '2': parseFloat(bank_property['curtosis of Wavelet Transformed image']),
      '3': parseFloat(bank_property['entropy of image']),
      '4': parseFloat(bank_property['class '])
    })
  )
}

module.exports = {
  iris_data,
  bank_data
}
