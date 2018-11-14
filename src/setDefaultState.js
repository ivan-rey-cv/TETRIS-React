import setMatrix from './utils/setMatrix'
import { COLS, ROWS } from './utils/variables'
import randomTetromino from './utils/randomTetromino'
import randomNumber from './utils/randomNumber'

function setDefaultState() {
	return {
		isGameOver: false,
		inGame: false,
		points: 0,
		ctx: null,
		pos_x: 2 + randomNumber(0, COLS / 2),
		pos_y: -1,
		board: setMatrix(ROWS, COLS),
		nextTetromino: randomTetromino(),
		currentTetromino: randomTetromino()
	}
}

export default setDefaultState
