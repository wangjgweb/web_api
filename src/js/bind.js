/*
 * @Date: 2020-11-05 09:59:19
 * @FilePath: /web_api/src/bind.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-11-11 17:59:55
 * @Description: 
 */
(function () {
  // 手动实现bind
  const bind = function (context) {
    let me = this;
    let args = Array.prototype.slice.call(arguments, 1)
    return function () {
      var innerArgs = Array.prototype.slice.call(arguments)
      var finalArgs = args.concat(innerArgs)
      return me.apply(context, finalArgs)
    }
  }
  // 手动实现apply
  const apply = function (targetObj, argsArry) {
    if (typeof argsArry === 'undefined' || typeof argsArry === null) {
      argsArry = []
    }
    if (typeof targetObj === 'undefined' || typeof targetObj === null) {
      targetObj = window
    }
    targetObj = new Object(targetObj)
    var targetFnkey = 'targetFnkey'
    targetObj[targetFnkey] = this
    var result = targetObj[targetFnkey](...argsArry)
    delete targetObj[targetFnkey]
    return result
  }
})()