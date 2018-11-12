export default function lockTetrominoToBoard(tetromino, board, pos_x, pos_y) {
	tetromino.matrix.forEach((row, rowIndex) => {
		row.forEach((cellItem, cellIndex) => {
			if (cellItem === 1) {
				// mutate board
				// board's cell as tetromino.color
				board[pos_y + rowIndex][pos_x + cellIndex] = tetromino.color
			}
		})
	})

	return board
}
