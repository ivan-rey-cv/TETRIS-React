import React from 'react'

import styled from 'styled-components'

const Header = styled.header`
	padding: 0.5rem 0.75rem;
	border-bottom: 2px solid purple;

	display: flex;
	justify-content: space-between;
`

function HeaderLayout(props) {
	return <Header>{props.children}</Header>
}

export default React.memo(HeaderLayout)
