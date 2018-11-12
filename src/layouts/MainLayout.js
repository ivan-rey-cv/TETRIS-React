import React from 'react'

import styled from 'styled-components'
const Main = styled.main`
	margin: 0 auto;
	width: 100%;
	height: 100%;
	max-height: 600px;
	max-width: 600px;

	display: flex;
	flex-direction: column;
`

function MainLayout(props) {
	return <Main {...props}>{props.children}</Main>
}

export default React.memo(MainLayout)
