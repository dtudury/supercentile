const CoinbasePro = require('coinbase-pro')

class Range {
  constructor (weight, volume, low, high) {
    this.weight = weight
    this.volume = volume
    this.low = low
    this.high = high
  }
  split (v) {
    if (this.low > v || this.high < v) {
      throw new Error('split value out of range')
    } else if (this.low === Number.NEGATIVE_INFINITY) {
      return [new Range(0, 0, this.low, v), new Range(this.weight, this.volume, v, this.high)]
    } else if (this.high === Number.POSITIVE_INFINITY) {
      return [new Range(this.weight, this.volume, this.low, v), new Range(0, 0, v, this.high)]
    }
    const volume = this.volume - 2
    if (!volume) {
      return [new Range(this.low, 1, this.low, v), new Range(this.high, 1, v, this.high)]
    }
    const density = this.weight / this.volume
    const middle = (this.high + this.low) / 2
    if (density <= middle) {
      let x = (this.weight - this.high) / (this.volume - 1) - this.low
      let step = 2 * x / (this.volume - 2)
      let sum = 0
      for (let i = 0; i < this.volume - 1; i++) {
        sum += this.low + step * i
        console.log(this.low + step * i, sum)
      }
      sum += this.high
      console.log(this.high, sum)
    } else {
      let x = (this.weight - this.low) / (this.volume - 1) - this.high
      let step = 2 * x / (this.volume - 2)
      let sum = this.low
      console.log(this.low, sum)
      for (let i = this.volume - 2; i >= 0; i--) {
        sum += this.high + step * i
        console.log(this.high + step * i, sum)
      }
    }
  }
}

const r1 = new Range(69, 6, 5, 25)
console.log(r1)
console.log(r1.split(10))

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
      // console.log(range)
    }
    return distOut
  }
  static getVolumeInRange (dist, range) {

  }
}

/*
let a = new Distribution(1)
console.log(a.toString())
let b = new Distribution(2)
console.log(b.toString())
let sum = Distribution.add(a, b)
console.log(sum.toString())
*/
