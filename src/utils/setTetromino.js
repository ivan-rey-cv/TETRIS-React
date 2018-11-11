import randomNumber from './randomNumber'

const tetrominoes = [

	[
		3, 'Z', 'crimson', [
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		]
	],
	[
		3, 'S', 'green', [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		]
	],
	[
		3, 'L', 'orange', [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		]
	],
	[
		3, 'T', 'hotpink', [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0],
		]
	],
	[
		3, 'J', 'blue', [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		]
	],
	[
		4, 'O', 'yellow', [
			[0, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
		]
	],
	[
		4, 'I', 'teal',[
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]
	]
]

class Shape {
	constructor(size, name, color, matrix) {
		this.name = name
		this.size = size
		this.color = color
		this.matrix = matrix
	}

	rotate() {
		if(this.size === 3) {
			let lastMatrix = this.matrix
			this.matrix = [
				[lastMatrix[2][0], lastMatrix[1][0], lastMatrix[0][0]],
				[lastMatrix[2][1], lastMatrix[1][1], lastMatrix[0][1]],
				[lastMatrix[2][2], lastMatrix[1][2], lastMatrix[0][2]],
			]
			return this
		}

		if(this.size === 4) {
			let lastMatrix = this.matrix
			this.matrix = [
				[lastMatrix[3][0], lastMatrix[2][0], lastMatrix[1][0], lastMatrix[0][0]],
				[lastMatrix[3][1], lastMatrix[2][1], lastMatrix[1][1], lastMatrix[0][1]],
				[lastMatrix[3][2], lastMatrix[2][2], lastMatrix[1][2], lastMatrix[0][2]],
				[lastMatrix[3][3], lastMatrix[2][3], lastMatrix[1][3], lastMatrix[0][3]],

			]
			return this
		}
	}
}

export default function setShape() {
	let randomIndex = randomNumber(0, tetrominoes.length)
	let randomTetromino =  tetrominoes[randomIndex]
	return new Shape(...randomTetromino)
}