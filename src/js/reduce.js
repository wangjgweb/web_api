/*
 * @Date: 2020-11-04 11:07:25
 * @FilePath: /web_api/src/js/reduce.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-06-11 15:39:52
 * @Description: 
 */
(function () {
  // 通过reduce实现promise按顺序执行
  const f1 = () => new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log('1')
      resolve('1')
    }, 2000)
  })
  const f2 = () => new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log('2')
      resolve('2')
    }, 1000)
  })
  const runPromiseInSequence = (arry, value) => {
    arry.reduce((promiseChain, currentFuction)=>promiseChain.then(currentFuction), Promise.resolve(value))
  }
  runPromiseInSequence([f1, f2], 'init')

  // 通过reduce实现pipe
  const pipe = (...fnLists) => (value) => fnLists.reduce((acc, fn)=> fn(acc), value)

  // 通过reduce筛选对象
  const only = function (obj, keys) {
    if (typeof keys == 'string') {
      keys = keys.split(/ +/)
    }
    return keys.reduce((ref, key)=>{
        if (!obj[key]) return ref
        ref[key] = obj[key]
        return ref
      }, {})
  }

  var obj1 = {
    a: 'a',
    b: 'b',
    c: 'c'
  }
  console.log(only(obj1, ['a', 'b']))

  // 手动实现reduce
  Object.defineProperty(Array.prototype, 'reduceFn', {
    value: function (callBack) {
      if (this == null) {
        throw new TypeError('Array.prototype.reduceFn called no null or undefined')
      }
      if (typeof callBack != 'function') {
        throw new TypeError('callBanck is not a function')
      }
      var o = Object(this)   //将基本类型转换为对象
      var len = o.length;

      var k = 0;
      var value;
      if (arguments.length >= 2) {
        value = arguments[1]
      } else {
        while(k<len && !(k in o)) {
          k++
        }
        if (k >= len) {
          throw new TypeError('reduce of empty Array')
        }
        value = o[k++]
      }
      while (k<len) {
        if (k in o) {
          value = callBack(value, o[k], k, o)
        }
        k++
      }
      return value

    }
  })
  var arr = [1,2,3]
  let result = arr.reduceFn((pre, current)=>{
    return pre + current
  })

  Array.prototype.reduceFn2 = Array.prototype.reduceFn2 || function (callBack, initVal) {
    var arr = this
    var base = typeof initVal === 'undefined' ? arr[0] : initVal
    var startPoint = typeof initVal == 'undefined' ? 1 : 0
    arr.slice(startPoint).forEach((item, index)=>{
      base = callBack(base, item, index+startPoint, arr)
    })
    return base
  }
  let result2 = arr.reduceFn2((pre, current) => {
    return pre+current
  })
  console.log('1-----', result2)
})()