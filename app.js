const express = require('express')
const app = express()
const port = 5000
const _ = require('lodash')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/package', (req, res) => {

  const width = _.get(req, 'query.width', 0)
  const height = _.get(req, 'query.height', 0)
  const weight = _.get(req, 'query.weight', 0)
  const depth = _.get(req, 'query.depth', 0)

  if (width === 0 || height === 0 || weight === 0 || depth === 0){
    res.send({
      error: 'Invalid parameters'
    })
  }

  const volume = height*width*depth

  if ( weight > 50 ) {
    res.send({
      category: 'Reject',
      cost: 'N/A'
    })
  }

  if ( weight > 10 ) {
    const cost = 15 * weight
    res.send({
      category: 'Heavy Parcel',
      cost
    })
  }

  if ( volume < 1500) {
    const cost = 0.05*volume
    res.send({
      category: 'Small Parcel',
      cost
    })
  }

  if ( volume < 2500) {
    const cost = 0.04*volume
    res.send({
      category: 'Medium Parcel',
      cost
    })
  }

  const cost = 0.03*volume
  res.send({
    category: 'Large Parcel',
    cost
  })
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
  console.log(`Sample URL::: http://localhost:${port}/package?weight=51&height=20&width=5&depth=20`)
})