/*
 * @Date: 2021-02-20 11:11:06
 * @FilePath: /web_api/src/minivue/js/observer.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-20 19:50:38
 * @Description: 
 */
class Observer {
  constructor (data) {
    this.walk(data)
  }

  walk (data) {
    if (!data || typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })

  }

  defineReactive (obj, key, value) {
    const that = this
    let dep = new Dep()
    this.walk(value)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set (newValue) {
        if (newValue === value) {
          return
        }
        value = newValue
        that.walk(newValue)
        dep.notify()
      }
    })
  }
}
