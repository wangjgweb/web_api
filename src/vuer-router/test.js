/****** 已知条件 ********/
const elA = getA()
const elB = getB()

function handleClick() {
    // do something
}

/****** TODO ******/
// 实现产品需求
elA.addEventListener('click', funciton (event) {
	let target = event.target.node
	if (elB.node == target) {
		return
	} else {
		handleClick()
	}

})