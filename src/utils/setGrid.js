import createList from './createList'

export default function setGrid(rows, cols) {
	let grid = []
	let list = createList(cols, '')

	for (let i = 0; i < rows; i++) {
		// copy list
		let arr = [...list]
		grid.push(arr)
	}
	return grid
}
