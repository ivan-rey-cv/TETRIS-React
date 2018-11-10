function setGrid(rows, cols) {
	let grid = []
	let list = []

	// row = ['', '' ...]
	// accepts color strings, eg 'red', to color the grid
	for (let i = 0; i < cols; i++) {
		list.push('')
	}

	for (let i = 0; i < rows; i++) {
		// copy list
		let arr = [...list]
		grid.push(arr)
	}
	return grid
}

export default setGrid
