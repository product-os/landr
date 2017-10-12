import React from 'react'
import { Helmet } from 'react-Helmet'
import images from 'images'
import humanize from 'underscore.string/humanize'
import capitalize from 'underscore.string/capitalize'
import { withTheme } from 'styled-components'

const pageTitle = (repoName, path) => {
  if (path === '/') {
    return repoName
  }
  return `${humanize(capitalize(path.replace(/\//g, ' ')))} - ${repoName}`
}

export default withTheme(props => {
  return (
    <Helmet
      defaultTitle={props.repository.name}
      titleTemplate={`%s | ${pageTitle(
        props.repository.name,
        props.location.pathname
      )}`}
      link={[
        {
          rel: 'icon',
          href: images[`favicon`],
          type: 'image/x-icon'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto|Ubuntu+Mono'
        }
      ]}
      meta={[
        {
          name: 'theme-color',
          content: props.theme.colors.primary
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:site_name',
          content: props.repository.name
        },
        {
          name: 'og:description',
          content: props.repository.description
        },
        {
          name: 'og:image',
          content: images[`logo`]
        }
      ]}
    />
  )
})
