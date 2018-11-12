import { SQ, ROWS, COLS } from './variables'
import paintMatrix from './paintMatrix'

class Shape {
	constructor({ size, name, color, matrix, pos_x, pos_y }) {
		this.name = name
		this.size = size
		this.color = color
		this.matrix = matrix
		this.pos_x = pos_x
		this.pos_y = pos_y
		this.isLocked = false
	}

	getNextRotation() {
		if (this.size === 3) {
			let lastMatrix = this.matrix
			let newMatrix = [
				[lastMatrix[2][0], lastMatrix[1][0], lastMatrix[0][0]],
				[lastMatrix[2][1], lastMatrix[1][1], lastMatrix[0][1]],
				[lastMatrix[2][2], lastMatrix[1][2], lastMatrix[0][2]]
			]
			return newMatrix
		}

		if (this.size === 4) {
			let lastMatrix = this.matrix
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

	checkCollision(newPos_x, newPos_y, matrix, board) {
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

	// action -> 'draw' or 'clear'
	paint(action, ctx) {
		paintMatrix(
			action,
			ctx,
			this.matrix,
			this.pos_x,
			this.pos_y,
			this.color
		)
	}

	move(x, y, ctx, board) {
		let newPos_x = this.pos_x + x
		let newPos_y = this.pos_y + y
		this.paint('clear', ctx)
		let hasCollision = this.checkCollision(
			newPos_x,
			newPos_y,
			this.matrix,
			board
		)

		if (hasCollision) {
			this.paint('draw', ctx)
		} else {
			this.pos_x = newPos_x
			this.pos_y = newPos_y
			this.paint('draw', ctx)
		}

		// used in down property
		return hasCollision
	}

	rotate(ctx, board) {
		let newMatrix = this.getNextRotation()
		let hasCollision = this.checkCollision(
			this.pos_x,
			this.pos_y,
			newMatrix,
			board
		)

		if (hasCollision) {
			// kick to opposite direction when has collision
			let newPos_x =
				this.pos_x + 1 < COLS / 2 ? this.pos_x + 1 : this.pos_x - 1

			let newPosHasCollision = this.checkCollision(
				newPos_x,
				this.pos_y,
				newMatrix,
				board
			)
			if (!newPosHasCollision) {
				this.paint('clear', ctx)
				this.pos_x = newPos_x
				this.matrix = newMatrix
				this.paint('draw', ctx)
			}
		}
		// rotate as normal
		else {
			this.paint('clear', ctx)
			this.matrix = newMatrix
			this.paint('draw', ctx)
		}
	}

	down(ctx, board) {
		let hasCollided = this.move(0, 1, ctx, board)
		if (hasCollided) {
			console.log({ board })
		}
		return hasCollided
	}
}

export default Shape
