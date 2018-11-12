import { COLS } from './variables'
import createList from './createList'

export default function removeFilledRows(board) {
	const filteredBoard = board.filter(row => !row.every(cell => cell))
	let count = board.length - filteredBoard.length

	let newBoard
	if (count > 0) {
		let emptyLists = []
		for (let i = 0; i < count; i++) {
			let list = createList(COLS, '')
			emptyLists.push(list)
		}
		newBoard = [...emptyLists, ...filteredBoard]
	} else {
		newBoard = board
	}

	return {
		newBoard,
		points: count * 50
	}
}
