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
	'#C364C5',
	'#17806D',
	'#CB4154',
	'#76FF7A',
	'#FFBD88',
	'#FF6E4A',
	'#0D98BA',
	'#FF5349',
	'#7851A9',
	'#FFCF48',
	'#A8E4A0',
	'#1A4876',
	'#FEFE22',
	'#FF2B2B',
	'#FFA089',
	'#FF43A4',
	'#6E5160',
	'#FF8243',
	'#CA3767',
	'#BC5D58'
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
