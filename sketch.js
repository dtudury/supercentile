class Values {
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
    let average = this.total / this.count
    let middle = (this.low + this.high) / 2
    let delta = average - middle
    // 4 -> 3.5     | Math.sqrt(Math.pow(14  , 2) / 16) | 0.75
    // 6 -> 2.75    | Math.sqrt(Math.pow(11  , 2) / 16) | 0.25 * 3
    // 8 -> 2.5     | Math.sqrt(Math.pow(10  , 2) / 16) | 0.125 * 2
    // 10 -> 2.375  | Math.sqrt(Math.pow( 9.5, 2) / 16) | 0.075 * 1 2/3
    // 12 -> 2.3    | Math.sqrt(Math.pow( 9.2, 2) / 16) | 0.05 * 1 1/2
    // 14 -> 2.25   | Math.sqrt(Math.pow( 9  , 2) / 16)
    let weight = average + delta * 3.5
    console.log(this.count)
    console.log((this.low + this.high) / 2)
    console.log(average)
    console.log(weight)
    console.log(delta)
    console.log('-----')
    let outValue = new Values()
    for (let i = 0; i < this.count; i++) {
      let t = i / (this.count - 1)
      let it = 1 - t
      let value = this.low * it * it + weight * 2 * it * t + this.high * t * t
      console.log(value)
      outValue.addValue(value)
    }
    console.log(outValue)
  }
}

let values = new Values()
  ;[1085, 1090, 1099, 1100].forEach(value => values.addValue(value))
console.log(values)
values.split()
