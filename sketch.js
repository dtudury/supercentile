const CoinbasePro = require('coinbase-pro')

class Distribution {
  constructor (value) {
    if (value != null) {
      this.values = [Number.NEGATIVE_INFINITY, value, Number.POSITIVE_INFINITY]
      this.weights = [value, value]
      this.volumes = [1, 1]
    } else {
      this.values = [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]
      this.weights = [0]
      this.volumes = [0]
    }
  }
  toString () {
    return `${this.values}, ${this.weights}, ${this.volumes}`
  }
  clone () {
    let out = new Distribution()
    out.values = [...this.values]
    out.weights = [...this.weights]
    out.volumes = [...this.volumes]
  }
  static add (distA, distB) {
    const distOut = new Distribution()
    distOut.values = []
    distOut.weights = []
    distOut.volumes = []
    let idxA = 0
    let idxB = 0
    let valueA = distA.values[idxA]
    let valueB = distB.values[idxB]
    while (valueA < Number.POSITIVE_INFINITY || valueB < Number.POSITIVE_INFINITY) {
      if (valueA < valueB) {
        distOut.values.push(valueA)
        valueA = distA.values[++idxA]
      } else if (valueA > valueB) {
        distOut.values.push(valueB)
        valueB = distB.values[++idxB]
      } else {
        distOut.values.push(valueA)
        valueA = distA.values[++idxA]
        valueB = distB.values[++idxB]
      }
    }
    distOut.values.push(Number.POSITIVE_INFINITY)

    for (let idxOut = 0; idxOut < distOut.values.length - 1; idxOut++) {
      let range = [distOut.values[idxOut], distOut.values[idxOut + 1]]
      // distOut.weights.push(Distribution.getWeightInRange(distA, range) + Distribution.getWeightInRange(distB, range))
      distOut.volumes.push(Distribution.getVolumeInRange(distA, range) + Distribution.getVolumeInRange(distB, range))
      console.log(range)
    }
    return distOut
  }
  static getVolumeInRange (dist, range) {
    
  }
}

let a = new Distribution(1)
console.log(a.toString())
let b = new Distribution(2)
console.log(b.toString())
let sum = Distribution.add(a, b)
console.log(sum.toString())

/*
let values = new Range()
  ;[1, 2, 5, 85, 90, 95, 100].forEach(value => values.addValue(value))
console.log(values.toString())
values.split()

// const publicClient = new CoinbasePro.PublicClient()
const websocket = new CoinbasePro.WebsocketClient(['BTC-USD', 'ETH-USD'])
websocket.on('message', data => {
  console.log(data)
})
*/
