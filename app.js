const { iris_data } = require('./helpers/CSVReader')
const { fit } = require('./model/NaiveBayes')

const iris = async () => {
  const x = await await (await iris_data()).intLabeledFlowers
  // const y = await await (await iris_data()).labels

  let y = [0, 1, 2]
  fit(x, y)
}

iris()
