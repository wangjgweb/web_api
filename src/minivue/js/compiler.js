/*
 * @Date: 2021-02-20 14:18:03
 * @FilePath: /web_api/src/minivue/js/compiler.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-20 19:57:40
 * @Description: 
 */

 class compiler {
   constructor (vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
   }

   compile (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNoe(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 如果有子节点，递归调用
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
   } 

   compileElement (node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        attrName = attrName.slice(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
   }

   update (node, key, attrName) {
    let updateFn = this[attrName+"Updater"]
    updateFn && updateFn.call(this, node, this.vm[key], key)
   }

   textUpdater (node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, (newValue)=>{
      node.textContent = newValue
    })
   }

   modelUpdater (node, value, key) {
    node.value = value
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })

    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
   }

   compileText (node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue
      })
    }
   }

   isDirective (attrName) {
    return attrName.startsWith('v-')
   }

   isTextNode (node) {
    return node.nodeType === 3
   }

   isElementNoe (node) {
    return node.nodeType === 1
   }
 }