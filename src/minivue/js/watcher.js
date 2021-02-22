/*
 * @Date: 2021-02-20 19:45:07
 * @FilePath: /web_api/src/minivue/js/watcher.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-20 19:51:39
 * @Description: 
 */
class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.oldValue = vm[key]
    Dep.target = null
  }

  update () {
    let newValue = this.vm[this.key]
    if (newValue === this.oldValue) {
      return 
    }
    this.cb(newValue)
  }
}