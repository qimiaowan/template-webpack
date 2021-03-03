// import { createApp } from 'vue'
// import app from './app'
// createApp(app).mount('#app')

import a from './a'
import './1.css'
import './2.css'
import './3.css'
import './4.scss'
// import $ from 'jquery';
import('./b')
import cd from './as'
console.log('你das', cd)
console.log('你1', cd)
// 423
// console.log($);
console.log(a())
const obj = /* #__PURE__ */ new Proxy(
	{},
	{
		get() {
			return '喜喜到付'
		}
	}
)
const tt = 1
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
const aaaa = 1
const obj1 = { aaaa1: 1, bbbb1: 2 }
const { aaaa1, bbbb1 } = obj1
console.log(aaaa1)
console.log(bbbb1)
const c = add(t(1), 2)
console.log(c)
console.log(add(1, 32))
const exponentiation = 2 ** 2
console.log(exponentiation)
