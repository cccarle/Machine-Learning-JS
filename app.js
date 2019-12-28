const { iris_data } = require('./helpers/CSVReader')
const NaiveBayes = require('./model/NaiveBayes')

const iris = async () => {
  const x = await await (await iris_data()).intLabeledFlowers
  const y = [0, 1, 2]
  const nv = new NaiveBayes()
  nv.fit(x, y)
  let predictions = nv.predict(x)
  let accuracyScore = nv.accuracyScore(predictions, x)
}

iris()
