export default function renderTetromino(type, ctx, tetromino, x, y) {
	let length = '20'

	tetromino.matrix.forEach((row, rowIndex) => {
		row.forEach((cell, cellIndex) => {
			let pos_x = x + cellIndex * length
			let pos_y = y + rowIndex * length

			if (type === 'draw') {
				if (cell === 1) {
					ctx.fillStyle = tetromino.color
					ctx.fillRect(pos_x, pos_y, length, length)
				}
			}

			if (type === 'clear') {
				ctx.clearRect(pos_x, pos_y, length, length)
				ctx.strokeStyle = 'lightgray'
				ctx.strokeRect(pos_x, pos_y, length, length)
			}
		})
	})
}
