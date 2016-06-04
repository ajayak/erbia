// Simple module exposing environment variables to rest of the code.

import jetpack from 'fs-jetpack';

// Normal way of obtaining env variables: They are written to package.json file.
var env;
var app;
if (process.type === 'renderer') {
    app = require('electron').remote.app;
} else {
    app = require('electron').app;
}
var appDir = jetpack.cwd(app.getAppPath());
var manifest = appDir.read('package.json', 'json');

if (manifest && manifest.env) {
    env = manifest.env;
}

export default env;
