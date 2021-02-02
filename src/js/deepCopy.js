/*
 * @Date: 2021-02-02 11:11:52
 * @FilePath: /web_api/src/js/deepCopy.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-02 11:33:11
 * @Description: 
 */
// 深拷贝
(function () {
  const deepCopy = function (target) {
    let dest
    if (typeof target === 'object') {
      // 如果是一个数组
      if (Array.isArray(target)) {
        dest = []
        target.forEach(item => {
          dest.push(deepCopy(item))
        })
      } else if (target === null) {
        dest = null
      } else if (target.constructor === RegExp) {
        dest = target
      } else {
        dest = {}
        for (let key in target) {
          dest[key] = deepCopy(target[key])
        }
      }
    } else {
      dest = target
    }
    return dest
  }
  let obj1 = {
    name : "jack.ma", age:40, like:{ dog:{ color:'black', age:3, }, cat:{ color:'white', age:2 } }
  }
  let obj2 = deepCopy(obj1);
  console.log(obj2);
})()