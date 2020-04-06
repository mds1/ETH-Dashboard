// 'use strict';

/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *   Author: David King
 *   Edited: Tarik Huber
 *   Based on the thread and article below
 *     https://github.com/firebase/functions-samples/issues/170
 *     https://codeburst.io/organizing-your-firebase-cloud-functions-67dc17b3b0da
 */

/**
 * Folder structure is as follows
 *
 *   functions
 *     auth
 *       ...user authentication functions
 *     db
 *       ...cloud firestore database functions...
 */

const glob = require('glob');
const camelCase = require('camelcase');


const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' });
for (let f = 0, fl = files.length; f < fl; f += 1) {
  const file = files[f];
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')); // Strip off '.f.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    /* eslint-disable-next-line */ // no-dynamic-require
    exports[functionName] = require(file);
  }
}
