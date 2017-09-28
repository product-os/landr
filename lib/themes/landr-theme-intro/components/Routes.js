import React from 'react'
import Index from 'pages/Index.js'
import About from 'pages/About.js'
import Layout from 'components/Layout.js'

const routes = [
  { component: Layout,
    routes: [
      { path: '/',
        exact: true,
        component: Index
      },
      { path: '/about',
        component: About
      }
    ]
  }
];

export default routes
