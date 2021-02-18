
let _Vue = null
export default class VueRouter {
  // 静态install方法    在vue.use时调用
  static install (Vue) {
    // 判断是否执行了install方法
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 将vue构造函数赋值到全局
    _Vue = Vue
    // 为每一个vue实例注入创建vue实例时传入的router对象
    _Vue.mixin({
      beforeCreate () {
        // 组件和实例都会调用该方法
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  // 创建router实例时调用的方法
  constructor (options) {
    // 保存创建router实例时的入参
    this.options = options
    // 保存路由组件对应关系对象
    this.routeMap = {}
    // 保存当前路由，data为响应式
    this.data = _Vue.observable({
      current: '/'
    })
  }

  // 初始化
  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 创建routeMap对象, 建立路径与组件一一对应关系
  createRouteMap () {
    console.log(this.options)
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  // 初始化组件
  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.$router.routeMap[this.to] ? this.to : '*'
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  // 监听页面前进、后退，更新组件路由
  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = this.routeMap[window.location.pathname] ? window.location.pathname : '*'
    })
  }
}
