import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));


const BALANCES = {
  szymon: 100000,
}

// @param user
app.get('/balances', (req, res) => {
  const username = req.query.username
  res.send({balances: BALANCES})
})

// @param name
app.post('/users', (req, res) => {
  const username = req.body.username.toLowerCase()
  BALANCES[username] = BALANCES[username] || 0

  res.send({
    user: {
      name: username,
      balance: BALANCES[username]
    }
  })
})

// @param user
app.get('/users/:username', (req, res) => {
  const username = req.params.username
  res.send({
    user: {
      name: username,
      balance: BALANCES[username]
    }
  })
})

/*  @param from
    @param to
    @param amount */
app.post('/transfer', (req, res) => {
  const fromName = req.body.from.toLowerCase()
  const toName = req.body.to.toLowerCase()
  const amount = parseInt(req.body.amount)

  if(BALANCES[fromName] < amount){
    throw Error('InsufficientFunds')
  }

  BALANCES[fromName] -= amount
  BALANCES[toName] += amount

  res.send({
    users: {
      from: {
        name: fromName,
        balance: BALANCES[fromName]
      },
      to: {
        name: toName,
        balance: BALANCES[toName]
      }
    }
  })
})


app.listen(3000)
