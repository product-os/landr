#!/usr/bin/env node
const capitano = require('capitano')
const { fetch } = require('./metadata')


const errorHandler = error => {
  console.error(error)
  process.exit(1)
}

capitano.command({
  signature: '*',
  description: 'Get repo metadata',
  action: async () => {
    try {

      fetch()

    } catch (error) {
      errorHandler(error)
    }
  }
})

capitano.run(process.argv, error => {
  if (error != null) {
    throw error
  }
})
