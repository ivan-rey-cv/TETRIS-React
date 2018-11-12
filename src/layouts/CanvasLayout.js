import React from 'react'

import styled from 'styled-components'
const Layout = styled.section`
	padding: 0.25rem;
	display: flex;
	justify-content: center;
	align-items: center;

	flex: 1;
`
const CanvasContainer = styled.div`
	height: 400px;
	width: 320px;
`

function CanvasLayout(props) {
	return (
		<Layout>
			<CanvasContainer>{props.children}</CanvasContainer>
		</Layout>
	)
}

export default React.memo(CanvasLayout)
