# is-test-env

Detect whether nodejs is running under `test` environment.

----

## Usage
```ts
if (is_test_env()) {
  console.log('Running under test environment.')
  // Script is running under test, mock the API
} else {
  // Use the real API
}
```

----

## Use cases
* Mock API in test environment
* Using different loggers in test environment

----

## How it works
* Check if NODE_ENV is set to `test`
* Check if `global` functions defined by following test runners are defined
  * mocha
  * jest
