const { iris_data } = require('./helpers/CSVReader')
const NaiveBayes = require('./model/NaiveBayes')

const iris = async () => {
  const x = await await (await iris_data()).intLabeledFlowers
  const y = [0, 1, 2]
  const nv = new NaiveBayes()
  nv.fit(x, y)

  let mock = [
    {
      sepal_length: 5.7,
      sepal_width: 2.8,
      petal_length: 1.6,
      petal_width: 0.8,
      species: 1
    }
  ]

  // console.log(x)
  nv.predict(mock)
}

iris()
