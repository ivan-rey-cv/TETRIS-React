export default function createList(total, value) {
	let list = []
	for (let i = 0; i < total; i++) {
		list.push(value)
	}

	return list
}
