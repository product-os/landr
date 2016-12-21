'use strict'
const _ = require('lodash')
const platform = require('platform')
const $ = require('jquery')
const downloads = $('#downloads').data('downloads')

// Find and download link based on detected OS
// Defualt is first link the matching is unsuccessful
const dynamicDownload = _.find(downloads, (d) => {
  if (new RegExp(d.OS).test(platform.os.family)) {
    return d
  }
})

if (dynamicDownload) {
  $('#dynamicDownload').attr('href', dynamicDownload.Release)
}
