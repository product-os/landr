import React from 'react'
import Index from 'pages/Index.js'
import Changelog from 'pages/Changelog.js'
import Layout from 'components/Layout.js'

const routes = [
  { component: Layout,
    routes: [
      { path: '/',
        exact: true,
        component: Index
      },
      { path: '/changelog',
        component: Changelog
      }
    ]
  }
];

export default routes
