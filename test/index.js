/**
 * Entry file for pulling all *.spec.js files and run them through webpack.
 * NOTE : Attempting to run this file through mocha command line will cause it to
 * barf since require.context does not exist in Node (server-side). Instead we
 * use the 'find' command search for *.spec.js files manually and pass it to
 * mocha vs xargs (see package.json test script).
 */
const testsContext = require.context('.', true /* use subdirectories*/, /spec.js$/);
testsContext.keys().forEach(testsContext);
