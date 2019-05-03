const CoinbasePro = require('coinbase-pro')

class Range {
  constructor (low = Number.POSITIVE_INFINITY, high = Number.NEGATIVE_INFINITY, count = 0, total = 0) {
    this.low = low
    this.high = high
    this.count = count
    this.total = total
  }
  addValue (value) {
    this.low = Math.min(this.low, value)
    this.high = Math.max(this.high, value)
    this.count++
    this.total += value
  }
  split () {
    let subtotal = this.total - this.low - this.high
    let middle = (this.low + this.high) / 2
    let average = subtotal / (this.count - 2)
    let values = new Range()
    values.addValue(this.low)
    values.addValue(this.high)
    if (middle > average) {
      let step = ((average - this.low) * 2 / (this.count - 1))
      for (let i = 1; i < this.count - 1; i++) {
        values.addValue(this.low + i * step)
      }
    } else {
      let step = ((this.high - average) * 2 / (this.count - 1))
      for (let i = 1; i < this.count - 1; i++) {
        values.addValue(this.high - i * step)
      }
    }
    console.log(values.toString())
  }
  toString () {
    return `<${this.low}..(${this.total / this.count}x${this.count})..${this.high}>`
  }
}

class Distribution {
  constructor () {
    this.ranges = [new Range()]
  }
  addValue (value) {
    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i]
      if (range.high > value) {
        range.addValue(value)
        return
      }
    }
  }
}

let values = new Range()
  ;[1, 2, 5, 85, 90, 95, 100].forEach(value => values.addValue(value))
console.log(values.toString())
values.split()

// const publicClient = new CoinbasePro.PublicClient()
const websocket = new CoinbasePro.WebsocketClient(['BTC-USD', 'ETH-USD'])
websocket.on('message', data => {
  console.log(data)
})
