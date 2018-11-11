export default function dawMatrix(ctx, matrix, x, y) {
	let length = '20'

	matrix.forEach((row, rowIndex) => {
		row.forEach((cellColor, cellIndex) => {
			let pos_x = x + cellIndex * length
			let pos_y = y + rowIndex * length

			if (cellColor === '') {
				// outlined box
				ctx.strokeStyle = 'lightgray'
				ctx.strokeRect(pos_x, pos_y, length, length)
			} else {
				// filled box
				ctx.fillStyle = cellColor
				ctx.fillRect(pos_x, pos_y, length, length)
			}
		})
	})
}
