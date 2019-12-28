const { iris_data } = require('./helpers/CSVReader')
const NaiveBayes = require('./model/NaiveBayes')

const iris = async () => {
  const x = await await (await iris_data()).iris_data
  const y = await await (await iris_data()).labels
  const nv = new NaiveBayes()
  nv.fit(x, y)
  let predictions = nv.predict(x)
  let accuracyScore = nv.accuracyScore(predictions, y)
  console.log(accuracyScore)
}

const bank = async () => {
  const x = await await (await iris_data()).bankData

  console.log(x)

  // const y = await await (await iris_data()).labels
  // const nv = new NaiveBayes()
  // nv.fit(x, y)
  // let predictions = nv.predict(x)
  // let accuracyScore = nv.accuracyScore(predictions, y)
  // console.log(accuracyScore)
}

iris()

bank()
