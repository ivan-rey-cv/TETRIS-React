export default function getRandomInt(min, max) {
	// inclusive to min, EXCLUSIVE to max
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}
