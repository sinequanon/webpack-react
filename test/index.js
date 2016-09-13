/**
 * Entry file for pulling all *.spec.js files and run them through webpack.
 * NOTE : Attempting to run this file through mocha command line will cause it to
 * barf since require.context does not exist in Node (server-side). 
 * An alternative is to use the 'find' command to search for *.spec.js files 
 * manually and pass it to mocha vs xargs. eg.
 * "find ./test -name '*.spec.js' | xargs ./node_modules/.bin/mocha"
 */
if (typeof window !== 'undefined') { // Only run this if not NODE
    const testsContext = require.context('.', true /* use subdirectories*/, /spec.js$/);
    testsContext.keys().forEach(testsContext);
}
