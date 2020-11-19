(function () {
  function Promise (executor) {
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onfulfilledArry = []
    this.onrejectedArry = []

    const resolve = value => {

      // 如果传递进来的是一个promise类型
      if (value instanceof Promise) {
        console.log('999', value)
        return value.then(resolve, reject)
      }
      setTimeout(() => {
        if (this.status === 'pending') {
          this.value = value
          this.status = 'fulfilled'
          this.onfulfilledArry.forEach(item => item(this.value))
        }
      })
    }

    const reject = reason => {
      setTimeout(() => {
        if (this.status === 'pending') {
          this.reason = reason
          this.status = 'rejected'
          this.onrejectedArry.forEach(item => item(this.reason))
        }
      })
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  const resolvePromise = (promise2, result, resolve, reject) => {
    // 当result与promise2相同时
    if (result === promise2) {
      reject(new TypeError('error circular'))
      return
    }

    // 是否已经执行过onfulfilled || onrejected
    let consumed = false
    let thenabel
    if (result instanceof Promise) {
      if (result.status === 'pending') {
        result.then(function (data) {
          resolvePromise(promise2, data, resolve, reject)
        }, reject)
      } else {
        result.then(resolve, reject)
      }
      return 
    }
    // 此时处理疑似promise的情况
    let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && target !== null
    if(isComplexResult(result)) {
      try {
        thenabel = result.then
        // 判断是否是promise类型
        if (typeof thenabel === 'function') {
          thenabel.call(result, function (data) {
            if (consumed) {
              return
            }
            consumed = true
            return resolvePromise(promise2, data, resolve, reject)
          }, function (error) {
            if (consumed) {
              return
            }
            consumed = true
            return reject(result)
          })
        }

      } catch (e) {
        if (consumed) {
          return
        } 
        consumed = true
        return reject(e)
      }
    } else {
      resolve(result)
    }
  }

  Promise.prototype.then = function (onfulfilled, onrejected) {

    // promise穿透实现   promsie.then(null).then(res=>res)
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected === 'function' ? onrejected : error => {throw error}
    let promise2
    if (this.status === 'fulfilled') {
      return  promise2 = new Promsie((resolve, reject) => {
        setTimeout(() => {
          try {
            let result = onfulfilled(this.value)
            resolvePromise(promise2, result, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
    }

    if (this.status === 'rejected') {
      return promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let result = onrejected(this.reason)
            resolvePromise(promise2, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }  

    if (this.status === 'pending') {
      return promise2 = new Promise((resolve, reject) => {
        this.onfulfilledArry.push(value => {
          try {
            let result = onfulfilled(value)
            resolvePromise(promise2, result, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        
        this.onrejectedArry.push(reason => {
          try {
            let result = onrejected(reason)
            resolvePromise(promise2, result, resolve, reject)
          }catch (e) {
            reject(e)
          }
        })
          
      })
    }
  }
  // catch方法
  Promise.prototype.catch = function (catchFunc) {
    return this.then(null, catchFunc)
  }
  // resove方法
  Promise.resolve = function (value) {
    return new Promise((resolve, reject)=>{
      resolve(value)
    }) 
  }

  // reject方法
  Promise.reject = function (reason) {
    return new Promise ((resolve, reject)=>{
      reject(value)
    }) 
  }
  
  // all方法
  Promise.all = function (promiseArry) {
    if (!Array.isArray(promiseArry)) {
      throw new TypeError('should array')
    }
    return new Promsie((resolve, reject) => {
      try {
        let resultArry = []
        const length = promiseArry.length
        for (let i=0; i<length; i++) {
          promiseArry[i].then(data=>{
            resultArry.push(data)
            if (resultArry.length === length) {
              resolve(resultArry)
            }
          }, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  // race方法
  Promise.race = function (promiseArry) {
    if (!Array.isArray(promiseArry)) {
      throw new TypeError('should array')
    }
    return new Promise((resolve, reject) => {
      try {
        const length = promiseArry.length;
        for (let i=0; i<length; i++) {
          promiseArry[i].then(resolve, reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  var p = new Promise ((resolve, reject)=>{
    setTimeout(()=>{
      resolve('lucas')
    }, 2000)
  }) 
  p.then((res)=>{
    console.log(res)
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(res + 'next')
      }, 4000)
    })
    .then(data => {
      console.log('222', data)
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve(data + 'uuu')
        }, 3000)
      })
    })
  }).then((data)=>{
    console.log(data)
  })

})()




