import randomNumber from './randomNumber'

const shapes = [
	{
		name: 'L',
		color: 'teal',
		grid: [['', 'teal', ''], ['', 'teal', ''], ['', 'teal', 'teal']]
	},
	{
		name: 'T',
		color: 'orange',
		grid: [['', 'orange', ''], ['orange', 'orange', 'orange'], ['', '', '']]
	},
	{
		name: '-L',
		color: 'lightgreen',
		grid: [
			['', 'lightgreen', ''],
			['', 'lightgreen', ''],
			['lightgreen', 'lightgreen', '']
		]
	},
	{
		name: 'O',
		color: 'lightsalmon',
		grid: [
			['lightsalmon', 'lightsalmon', ''],
			['lightsalmon', 'lightsalmon', ''],
			['', '', '']
		]
	},
	{
		name: 'I',
		color: 'crimson',
		grid: [['', '', ''], ['crimson', 'crimson', 'crimson'], ['', '', '']]
	}
]

export default function setShape() {
	let randomIndex = randomNumber(0, shapes.length)
	return shapes[randomIndex]
}
