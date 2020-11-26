(function () {
	const curry = (func) => {
		return function curriedFn (...args) {
			if (args.length < func.length) {
				return function (...args2) {
					return curriedFn(...args.concat(...args2))
				}
			} else {
				return func(...args)
			}
		}
	}
	function sum (a, b, c) {
	  return a+b+c
	}
	const sumNum = curry(sum)
	console.log(sumNum(1)(2)(3))

})()