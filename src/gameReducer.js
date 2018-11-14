import paintMatrix from './utils/paintMatrix'
import randomNumber from './utils/randomNumber'
import { SQ, COLS, ROWS } from './utils/variables'
import setDefaultState from './setDefaultState'
import checkCollision from './utils/checkCollision'
import getNextRotation from './utils/getNextRotation'
import randomTetromino from './utils/randomTetromino'
import removeFilledRows from './utils/removeFilledRows'
import lockTetrominoToBoard from './utils/lockTetrominoToBoard'

function gameReducer(state, action) {
	switch (action.type) {
		case 'START_GAME': {
			return {
				...setDefaultState(),
				inGame: true,
				isGameOver: false
			}
		}

		case 'TOGGLE_PAUSE': {
			const { pos_y, isPaused: prevPauseState } = state
			if (prevPauseState) {
				return { ...state, isPaused: false, pos_y: pos_y + 1 }
			} else {
				return { ...state, isPaused: true, pos_y: pos_y - 1 }
			}
		}

		case 'INIT_CTX': {
			return { ...state, ctx: action.ctx }
		}

		case 'DRAW_BOARD': {
			const { ctx, board } = state
			ctx.clearRect(0, 0, COLS * SQ, ROWS * SQ)
			paintMatrix('drawBoard', ctx, board, 0, 0)
			return state
		}

		case 'MOVE': {
			if (state.isPaused) {
				return state
			}

			const { newPos_x, newPos_y } = action
			const { ctx, pos_x, pos_y, board, currentTetromino } = state
			const { matrix, color } = currentTetromino
			let coord_x = newPos_x + pos_x
			let coord_y = newPos_y + pos_y
			let hasCollision = checkCollision(coord_x, coord_y, matrix, board)

			if (hasCollision) {
				paintMatrix('draw', ctx, matrix, pos_x, pos_y, color)
				// direction: down
				if (newPos_y >= 1) {
					// GAME OVER
					if (pos_y < 0) {
						return {
							...state,
							inGame: false,
							isGameOver: true
						}
					}

					const mutatedBoard = lockTetrominoToBoard(
						currentTetromino,
						board,
						pos_x,
						pos_y
					)
					const { newBoard, points } = removeFilledRows(mutatedBoard)
					const newerTetromino = randomTetromino()
					return {
						...state,
						points: state.points + points,
						ctx: state.ctx,
						pos_x: 2 + randomNumber(0, COLS / 2),
						pos_y: -1,
						board: [...newBoard],
						currentTetromino: state.nextTetromino,
						nextTetromino: newerTetromino
					}
				}

				return state
			} else {
				paintMatrix('clear', ctx, matrix, pos_x, pos_y, color)
				paintMatrix('draw', ctx, matrix, coord_x, coord_y, color)
				return { ...state, pos_x: coord_x, pos_y: coord_y }
			}
		}

		case 'ROTATE': {
			if (state.isPaused) {
				return state
			}

			const { board, currentTetromino, pos_x, pos_y, ctx } = state
			const { matrix, color } = currentTetromino
			let nextRotation = getNextRotation(currentTetromino)
			let hasCollision = checkCollision(pos_x, pos_y, nextRotation, board)

			if (hasCollision) {
				// kick to opposite direction when has collision
				let newPos_x = pos_x + 1 < COLS / 2 ? pos_x + 1 : pos_x - 1
				let newCollision = checkCollision(
					newPos_x,
					pos_y,
					nextRotation,
					board
				)
				if (!newCollision) {
					paintMatrix('clear', ctx, matrix, pos_x, pos_y, color)
					paintMatrix(
						'draw',
						ctx,
						nextRotation,
						newPos_x,
						pos_y,
						color
					)
					return {
						...state,
						pos_x: newPos_x,
						currentTetromino: {
							...state.currentTetromino,
							matrix: nextRotation
						}
					}
				}
				return state
			}
			// rotate as normal
			else {
				paintMatrix('clear', ctx, matrix, pos_x, pos_y, color)
				paintMatrix('draw', ctx, nextRotation, pos_x, pos_y, color)

				return {
					...state,
					currentTetromino: {
						...state.currentTetromino,
						matrix: nextRotation
					}
				}
			}
		}

		default: {
			return state
		}
	}
}

export default gameReducer
