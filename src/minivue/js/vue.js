/*
 * @Date: 2021-02-20 10:47:31
 * @FilePath: /web_api/src/minivue/js/vue.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-20 14:32:21
 * @Description: 
 */
class Vue {
  constructor (options) {
    this.$options = options
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this.$data = options.data
    // 转换为get、set，注入到vue实例
    this._proxyDData(this.$data)
    // 调用observer,监听数据变化
    new Observer(this.$data)

    new compiler(this)
  }

  _proxyDData (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          return data[key]
        },
        set (newVal) {
          if (newVal === data[key]) {
            return
          }
          data[key] = newVal
        }
      })
    })
    
  }
}