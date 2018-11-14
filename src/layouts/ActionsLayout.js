import React from 'react'

import styled from 'styled-components'

const Layout = styled.div`
	margin: 0 auto;
	padding: 0.25rem 0.25rem 1rem 0.25rem;
	width: 100%;
	max-width: 400px;

	display: flex;
	justify-content: space-around;
`

function ActionsLayout(props) {
	return <Layout>{props.children}</Layout>
}

export default React.memo(ActionsLayout)
