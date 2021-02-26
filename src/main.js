import a from './a'
import './1.css'
import './2.css'
import './3.css'
import './4.scss'
// import $ from 'jquery';
import('./b')
import cd from './as'
console.log('你', cd)

// console.log($);
console.log(a())
const obj = /*#__PURE__*/ new Proxy(
	{},
	{
		get() {
			return '喜喜'
		}
	}
)
const tt = 1
tt = 2
console.log(tt)
console.log(process.env.NODE_ENV)
console.log(process.env.a)
console.log(process.env.b)
var s = 'a32c'
function add(a, b) {
	return a + b
}
if (a) {
	console.log(11)
}
const aa = 43
console.log(obj.s)

const prom = new Promise((resolve, reject) => {
	resolve(1)
})

prom.then(res => {
	console.log(res)
})

const t = () => {
	console.log('->', 1)
	return 3
}
const c = add(t(1), 2)
console.log(c)
console.log(add(1, 32))
const exponentiation = 2 ** 2
console.log(exponentiation)
