function setGrid(rows, cols) {
	let grid = []
	let list = []

	// row = [false, false ...]
	for (let i = 0; i < cols; i++) {
		list.push(false)
	}

	for (let i = 0; i < rows; i++) {
		// copy list
		let arr = [...list]
		grid.push(arr)
	}
	return grid
}

export default setGrid
