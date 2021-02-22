/*
 * @Date: 2021-02-20 18:43:09
 * @FilePath: /web_api/src/minivue/js/dep.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-20 19:53:28
 * @Description: 
 */
class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }  

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}