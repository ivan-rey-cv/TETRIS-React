import { ROWS, COLS } from './variables'

export default function checkCollision(newPos_x, newPos_y, matrix, board) {
	let hasCollision = matrix.reduce((hasCollided, row, rowIndex) => {
		if (hasCollided) {
			return hasCollided
		}

		row.forEach((cell, cellIndex) => {
			if (cell === 1) {
				let matrixRow = newPos_y + rowIndex
				let matrixCol = newPos_x + cellIndex

				let outOfBounds =
					matrixRow >= ROWS || matrixCol < 0 || matrixCol >= COLS

				if (outOfBounds) {
					return (hasCollided = true)
				} else {
					let boardCell = board[matrixRow][matrixCol]
					// has collided if boardCell contains color string
					return boardCell && (hasCollided = true)
				}
			}
		})
		return hasCollided
	}, false)
	return hasCollision
}
