import a from './a'
import b from './b'
console.log(a());
console.log(b());
const obj = /*#__PURE__*/new Proxy({}, {
  get() {
    return 1
  }
})

console.log(process.env.NODE_ENV);
console.log(process.env.a);
console.log(process.env.b);

function add(a, b) {
  return a + b
}
const aa = 43
console.log(obj.s);

const prom = new Promise((resolve, reject) => {
  resolve(1)
})

prom.then(res => {
  console.log(res);
})

const t = ()=>{
  console.log('->', 1);
  return 3
}
const c = add(t(1), 2)
console.log(c);
console.log(add(1,3))
const exponentiation = 2 ** 2
console.log(exponentiation);
