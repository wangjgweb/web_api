/*
 * @Date: 2020-11-11 17:57:47
 * @FilePath: /web_api/src/js/getImg.js
 * @Autor: wangjiguang
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-11-12 10:59:25
 * @Description: 
 */
(function () {
  let urlLists = [
    'https://img30.360buyimg.com/imgzone/jfs/t1/63858/1/5030/135114/5d316ff9E9aea7ca6/8305db4b1ed53731.jpg',
    'https://img30.360buyimg.com/imgzone/jfs/t1/47180/10/5354/116034/5d316ff9E3548c643/8a235dc5421b783f.jpg',
    'https://img12.360buyimg.com/imgzone/jfs/t1/45658/3/5429/67959/5d316ffaE52348372/b3a7552afc58e9c3.jpg',
    'https://img11.360buyimg.com/imgzone/jfs/t1/47044/40/5408/46155/5d316ffaE1eee4c95/baf2d6e412701712.jpg',
    'https://img11.360buyimg.com/imgzone/jfs/t1/76553/38/4982/63267/5d316ffaEedcb5046/041647fcf6ac0bec.jpg'
  ]
  const loadImg = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        resolve(url)
      }
      img.onerror = function () {
        reject(url)
      }
      img.src = url
    }) 
  }
  const getImgByReduce = () => {
    urlLists.map(loadImg).reduce((sequence, imgPromise) => {
      return sequence.then(()=>imgPromise)
    }, Promise.resolve())
    // urlLists.reduce((prePromise, url)=>{
    //   return prePromise.then(()=>loadImg(url))
    // }, Promise.resolve())
  }
  // getImgByReduce()s
  

  const getImgByLimit = (urlLists, limit) => {
    let copyLists = [...urlLists];   
    if (copyLists.length <= limit) {
      return Promise.all(urlLists.map(getImg))
    }
    let promiseArry = copyLists.splice(0, limit).map(loadImg)
    return copyLists.reduce((prePromise, url) => {
      return prePromise.then(()=>Promise.race(promiseArry))
        .catch(error => {console.log(error)})
        .then(raceUrl => {
          let imgIndex = urlLists.findIndex(item => raceUrl === item)
          const arryIndex = promiseArry.findIndex((val, promiseIndex, arry) => promiseIndex === imgIndex)
          promiseArry.splice(arryIndex, 1)
          promiseArry.push(loadImg(url))
        })
    }, Promise.resolve())
    .then(()=>Promise.all(promiseArry))
  }
  getImgByLimit(urlLists, 3).then(data=>{console.log(data)})

})()