'use strict';
const _ = require('lodash');
const platform = require('platform');
const $ = require('jquery');
const downloads = $('#downloads').data('downloads');

// Find and download link based on detected OS
// Defualt is first link the matching is unsuccessful
const dynamicDownload = _.find(downloads, (d) => {
  new RegExp(d.OS).test(platform.os.family);
});

if (dynamicDownload) {
  $('#dynamicDownload').attr('href', dynamicDownload.Release);
}

$('.downloads-table a').click((e) => {
  if (new RegExp('linux').test($(e.target).text())) {
    $('#instructions-linux').removeClass('hidden-xs-up');
  }
});
