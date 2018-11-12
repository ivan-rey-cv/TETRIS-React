import randomNumber from './randomNumber'
import Shape from './Shape'
const tetrominoes = [
	{
		size: 3,
		name: 'Z',
		color: 'crimson',
		matrix: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
	},
	{
		size: 3,
		name: 'S',
		color: 'green',
		matrix: [[0, 1, 1], [1, 1, 0], [0, 0, 0]]
	},
	{
		size: 3,
		name: 'L',
		color: 'orange',
		matrix: [[0, 1, 0], [0, 1, 0], [0, 1, 1]]
	},

	{
		size: 3,
		name: 'T',
		color: 'hotpink',
		matrix: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
	},
	{
		size: 3,
		name: 'J',
		color: 'blue',
		matrix: [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
	},
	{
		size: 4,
		name: 'O',
		color: 'yellow',
		matrix: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]
	},
	{
		size: 4,
		name: 'I',
		color: 'teal',
		matrix: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
	}
]

export default function randomTetromino() {
	let randomIndex = randomNumber(0, tetrominoes.length)
	let tetromino = tetrominoes[randomIndex]
	// random pos_x
	let defaultPos = { pos_x: 3 + randomIndex, pos_y: 3 }
	return new Shape({ ...tetromino, ...defaultPos })
}
