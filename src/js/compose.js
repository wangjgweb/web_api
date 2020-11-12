/*
 * @Date: 2020-11-04 17:44:52
 * @FilePath: /web_api/src/compose.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-11-11 18:00:42
 * @Description: 
 */
(function () {
	function f1 () {
		console.log('1')
		return 1
	}
	function f2 () {
		console.log('2')
		return 2
	}
	function f3 () {
		console.log('3')
		return 3
	}
	function f4 () {
		console.log('4')
		return 4
	}
	// redux实现
	const compose = function (...funcs) {
		if (funcs.length == 0) {
			return arg => arg
		}
		if (funcs.length == 1) {
			return funcs[0]
		}
		return funcs.reduce((pre, current)=>{
			return function (...args) {
				return pre(current(...args))
			}
		})
		// return function (val) {
		// 	return funcs.reverse().reduce((acc, fn)=>{
		// 		return fn(acc)
		// 	}, val)
		// }

	}
	// var fun = compose(f1,f2,f3,f4)
	// fun()
	// loadash实现
	const composeLodash = function (...funcs) {

		var length = funcs.length
		var index = length
		while(index--) {
			if (typeof funcs[index] != 'function') {
				throw new TypeError('not funciton')
			}
		 }
		 return function (...args) {
			 var index = 0;
			 var result = length ? funcs.reverse()[index].apply(this, args) : args;
			 while(++index < length) {
				 result = funcs[index].call(this, result)
			 }
			 return result
		 }
	}
	var fun2 = composeLodash(f1,f2,f3,f4)
	fun2()
})()