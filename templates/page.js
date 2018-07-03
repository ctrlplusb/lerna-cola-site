import React from 'react'
import MarkdownPage from '<%= pathToRoot %>components/markdown-page'

const markdown = `
<%=source%>
`

export default () => <MarkdownPage>{markdown}</MarkdownPage>
