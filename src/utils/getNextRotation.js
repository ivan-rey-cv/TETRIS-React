export default function getNextRotation(tetromino) {
	if (tetromino.size === 3) {
		let lastMatrix = tetromino.matrix
		let newMatrix = [
			[lastMatrix[2][0], lastMatrix[1][0], lastMatrix[0][0]],
			[lastMatrix[2][1], lastMatrix[1][1], lastMatrix[0][1]],
			[lastMatrix[2][2], lastMatrix[1][2], lastMatrix[0][2]]
		]
		return newMatrix
	}

	if (tetromino.size === 4) {
		let lastMatrix = tetromino.matrix
		let newMatrix = [
			[
				lastMatrix[3][0],
				lastMatrix[2][0],
				lastMatrix[1][0],
				lastMatrix[0][0]
			],
			[
				lastMatrix[3][1],
				lastMatrix[2][1],
				lastMatrix[1][1],
				lastMatrix[0][1]
			],
			[
				lastMatrix[3][2],
				lastMatrix[2][2],
				lastMatrix[1][2],
				lastMatrix[0][2]
			],
			[
				lastMatrix[3][3],
				lastMatrix[2][3],
				lastMatrix[1][3],
				lastMatrix[0][3]
			]
		]
		return newMatrix
	}
}
