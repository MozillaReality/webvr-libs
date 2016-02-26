var url = require('url');
var fs = require('fs');

var rp = require('request-promise');


var FILES = {
  'webvr-polyfill.js': 'https://raw.githubusercontent.com/toji/webvr-polyfill/webvr_1/build/webvr-polyfill.js',
  'VRControls.js': 'https://raw.githubusercontent.com/toji/three.js/webvr_v1/examples/js/controls/VRControls.js',
  'VREffect.js': 'https://raw.githubusercontent.com/toji/three.js/webvr_v1/examples/js/effects/VREffect.js'
};

function fetchSuccess (fn, body) {
  console.error('Saving "%s"', fn);
  fs.writeFile(fn, body, function (err) {
    if (err) {
      console.error('Could not save "%s"\n%s', fn, err);
      return;
    }
    console.error('Saved "%s"', fn);
  });
}

function fetchError (err) {
  console.error('Could not download "%s"\n%s', err.options.uri, err);
}

Object.keys(FILES).forEach(function (fn) {
  var uri = FILES[fn];
  console.error('Downloading "%s"', uri);
  rp(uri).then(function (body) {
    fetchSuccess(fn, body);
  }).catch(fetchError);
});
