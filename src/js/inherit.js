(function () {
	function Person (name) {
		this.name = name
	}
	Person.prototype.sayName = function () {
		console.log(this.name)
	}

	function Child (name, age) {
		Person.call(this, name)
		this.age = age
	}

	Child.prototype = Object.create(Person.prototype)
	Child.prototype.constructor = Child

	console.log(Child.prototype.constructor)
	let child1 = new Child('kk', 18)
	console.log(child1.sayName())
})()