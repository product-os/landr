import React from 'react'
import Index from 'pages/Index'
import Changelog from 'pages/Changelog'
import Docs from 'pages/Docs'
import Doc from 'components/Doc'
import Layout from 'components/Layout'

const routes = [
  { component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Index
      },
      {
        path: '/changelog',
        component: Changelog
      },
      {
        path: '/docs',
        component: Docs,
        routes: [
          {
            path: '/docs/:id',
            component: Doc
          }
        ]
      }
    ]
  }
]

export default routes
