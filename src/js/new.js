(function () {
	function newFunc (...args) {
		const constructor = args.shift()
		const obj = Object.create(constructor.prototype)

		const result = constructor.apply(obj, args)

		return (typeof result === 'object' && result !== null) ? result : obj
	}

	function Person (name) {
		this.name = name
	}

	const p = new newFunc(Person, 'hhh')
	console.log(p.name)
})()