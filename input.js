var keyMap = new Object()

function handleKeyDown(event) {
	keyMap[event.keyCode] = true
}

function handleKeyUp(event) {
	keyMap[event.keyCode] = false
}

var bindings = new Array()

function bind(key, action) {
	bindings.push({
		key: key,
		action: action })
}

function handleKeys() {
	for(var i = 0 ; i < bindings.length ; i++) {
		if(keyMap[bindings[i].key]) {
			bindings[i].action()
		}
	}
}

