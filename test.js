pdf(x, data) {
    data.map(a => {
      Object.keys(a.means).forEach(meanItem => {
        Object.keys(a.std).forEach(stdItem => {
          Object.keys(x).forEach(item => {
            console.log(a.means[meanItem])

            x.pdf_[item] =
              (1 / (Math.sqrt(2 * Math.PI) * a.std[stdItem])) *
              Math.E **
                (-((x[item] - a.means[meanItem]) ** 2) /
                  (2 * a.std[stdItem] ** 2))

            console.log(x)
          })
        })
      })
    })
  }