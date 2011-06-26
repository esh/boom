function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
}

var mvMatrixStack = [];

function mvPushMatrix(mvMatrix) {
	var copy = mat4.create();
	mat4.set(mvMatrix, copy);
	mvMatrixStack.push(copy);
}

function mvPopMatrix() {
	if (mvMatrixStack.length == 0) {
	    throw "Invalid popMatrix!";
	}
	return mvMatrixStack.pop();
}


function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function crossProduct(a, b) {
	return [a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]]
}

function dotProduct(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function normalize(v) {
	var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
	return [v[0] / l, v[1] / l, v[2] / l]
}
