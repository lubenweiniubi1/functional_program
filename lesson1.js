/**
 * 一个简单的例子
 * 我们从一个愚蠢的例子开始。下面是一个海鸥程序，鸟群合并则变成了一个更大的鸟群，
 * 繁殖则增加了鸟群的数量，增加的数量就是它们繁殖出来的海鸥的数量。
 * 注意这个程序并不是面向对象的良好实践，它只是强调当前这种变量赋值方式的一些弊端。
 */

var Flock = function (n) {
  this.seagulls = n
}

Flock.prototype.conjoin = function (other) {
  this.seagulls += other.seagulls
  return this
}

Flock.prototype.breed = function (other) {
  this.seagulls = this.seagulls * other.seagulls
  return this
}

var flock_a = new Flock(4)
var flock_b = new Flock(2)
var flock_c = new Flock(0)

var result = flock_a
  .conjoin(flock_c)
  .breed(flock_b)
  .conjoin(flock_a.breed(flock_b)).seagulls
console.log(result) //32

/**
 * 我相信没人会写这样糟糕透顶的程序。代码的内部可变状态非常难以追踪，而且，最终的答案还是错的！正确答案是 16，但是因为 flock_a 在运算过程中永久地改变了，所以得出了错误的结果。这是 IT 部门混乱的表现，非常粗暴的计算方式。

如果你看不懂这个程序，没关系，我也看不懂。重点是状态和可变值非常难以追踪，即便是在这么小的一个程序中也不例外。

我们试试另一种更函数式的写法：
 */

var conjoin = function (flock_x, flock_y) {
  return flock_x + flock_y
}

var breed = function (flock_x, flock_y) {
  return flock_x * flock_y
}

var flock_a = 4
var flock_b = 2
var flock_c = 0

var result = conjoin(
  breed(flock_b, conjoin(flock_a, flock_c)),
  breed(flock_a, flock_b)
)
console.log(result) //16
/**
 * 很好，这次我们得到了正确的答案，而且少写了很多代码。
 * 不过函数嵌套有点让人费解...（我们会在第 5 章解决这个问题）。
 * 这种写法也更优雅，不过代码肯定是越直白越好，所以如果我们再深入挖掘，
 * 看看这段代码究竟做了什么事，我们会发现，
 * 它不过是在进行简单的加（conjoin） 和乘（breed）运算而已。
 *
 * 代码中的两个函数除了函数名有些特殊，其他没有任何难以理解的地方。我们把它们重命名一下，看看它们的真面目。
 */

var add = function (x, y) {
  return x + y
}
var multiply = function (x, y) {
  return x * y
}
var flock_a = 4
var flock_b = 2
var flock_c = 0

var result = add(
  multiply(flock_b, add(flock_a, flock_c)),
  multiply(flock_a, flock_b)
)
