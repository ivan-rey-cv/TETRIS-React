import { SQ } from './variables'

function paintMatrix(action, ctx, matrix, pos_x, pos_y, drawColor) {
	matrix.forEach((row, rowIndex) => {
		row.forEach((cellItem, cellIndex) => {
			const coord_x = (pos_x + cellIndex) * SQ
			const coord_y = (pos_y + rowIndex) * SQ

			// used in drawing the board in App.js
			if (action === 'drawBoard') {
				// cellItem -> '' or '<color>'
				if (cellItem) {
					ctx.fillStyle = cellItem
					ctx.fillRect(coord_x, coord_y, SQ, SQ)
				} else {
					ctx.strokeStyle = 'lightgray'
					ctx.strokeRect(coord_x, coord_y, SQ, SQ)
				}
			}

			// used in Tetromino draw/clear
			if (cellItem === 1) {
				if (action === 'draw') {
					ctx.fillStyle = drawColor
					ctx.fillRect(coord_x, coord_y, SQ, SQ)
				}
				if (action === 'clear') {
					ctx.clearRect(coord_x, coord_y, SQ, SQ)
					ctx.strokeStyle = 'lightgray'
					ctx.strokeRect(coord_x, coord_y, SQ, SQ)
				}
			}
		})
	})
}

export default paintMatrix
