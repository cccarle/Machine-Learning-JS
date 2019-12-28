const { iris_data, bank_data } = require('./helpers/CSVReader')
const NaiveBayes = require('./model/NaiveBayes')

const iris = async () => {
  const x = await await (await iris_data()).iris_data
  const y = await await (await iris_data()).labels
  const nb = new NaiveBayes()
  nb.fit(x, y)
  let predictions = nb.predict(x)
  let accuracyScore = nb.accuracyScore(predictions, y)
  console.table(nb.confusion_matrix(predictions, y))
  console.log(accuracyScore)
}

const bank = async () => {
  const x = await await await (await bank_data()).bank_data
  const y = await await (await bank_data()).labels
  const nb = new NaiveBayes()
  nb.fit(x, y)
  let predictions = nb.predict(x)
  let accuracyScore = nb.accuracyScore(predictions, y)

  console.table(nb.confusion_matrix(predictions, y))
  console.log(accuracyScore)
}

iris()
bank()
