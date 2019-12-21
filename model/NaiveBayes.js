// x = values, y = labels
const fit = (x, y) => {
  let arr = []

  y.map(label => {
    arr.push(x.filter(x => x.species == label))
  })

  calculateMeanForEveryFlowerProperty(arr)

  console.log(arr[0])
}

const calculateMeanForEveryFlowerProperty = arr => {
  arr.map(flower =>
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
