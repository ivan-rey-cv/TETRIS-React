import randomNumber from './randomNumber'
const tetrominoes = [
	{
		size: 3,
		name: 'Z',
		matrix: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
	},
	{
		size: 3,
		name: 'S',
		matrix: [[0, 1, 1], [1, 1, 0], [0, 0, 0]]
	},
	{
		size: 3,
		name: 'L',
		matrix: [[0, 1, 0], [0, 1, 0], [0, 1, 1]]
	},

	{
		size: 3,
		name: 'T',
		matrix: [[0, 1, 0], [1, 1, 1], [0, 0, 0]]
	},
	{
		size: 3,
		name: 'J',
		matrix: [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
	},
	{
		size: 4,
		name: 'O',
		matrix: [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]
	},
	{
		size: 4,
		name: 'I',
		matrix: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
	}
]

const colors = [
	'teal',
	'crimson',
	'blue',
	'green',
	'yellow',
	'orange',
	'purple',
	'hotpink',
	'tomato'
]

export default function randomTetromino() {
	let randomIndex = randomNumber(0, tetrominoes.length)
	let colorIndex = randomNumber(0, colors.length)
	let tetromino = tetrominoes[randomIndex]

	return {
		...tetromino,
		color: colors[colorIndex]
	}
}
