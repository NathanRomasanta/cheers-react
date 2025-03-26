Scripts for running tests

##  Install JEST
    npm install --save-dev jest

##  Install Babel
    npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-jest

##  Run all tests 
    npm test
    npx jest

## Run all tests in test mode
    npm test -- --watch

## Run a specific test file 
    npx jest path/to/you/testfile.test.js

## Run tests matching a pattern
    npx jest nameOfTest

