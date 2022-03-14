import assert from 'assert'
import is_test_env from '.'

test_fn('Without any options', () => { assert.strictEqual(is_test_env(), false) })

test_fn('Respects NODE_ENV', () => {
  const original = process.env.NODE_ENV // Save original value

  process.env.NODE_ENV = 'test'
  assert.strictEqual(is_test_env(), true)

  process.env.NODE_ENV = 'prod'
  assert.strictEqual(is_test_env(), false)

  process.env.NODE_ENV = original // Restore original value
})

test_fn('Detects Mocha tdd', () => {
  mockGlobal(['suite', 'test']) // Missing setup
  assert.strictEqual(is_test_env(global), false)

  mockGlobal(['setup'])
  assert.strictEqual(is_test_env(global), true)

  mockGlobal(['suite', 'test', 'setup'], true)
})

test_fn('Detects jest', () => {
  mockGlobal(['describe', 'it'])
  assert.strictEqual(is_test_env(global), false)

  mockGlobal(['test'])
  assert.strictEqual(is_test_env(global), true)

  mockGlobal(['describe', 'it', 'setup'], true)
})

test_fn('Detects Mocha bdd', () => {
  mockGlobal(['context', 'describe', 'it'])
  assert.strictEqual(is_test_env(global), true)

  mockGlobal(['context', 'describe', 'it'], true)
})

/** Test functions and reports status */
export function test_fn(title: string, fn: Function): void {
  try {
    fn()
    console.log(`✔ ${title}`)
  }
  catch (e) {
    console.error(`✖ ${title}`)
    console.error(e)
    process.exit(1)
  }
}

type globals = 'suite' | 'test' | 'setup' | 'context' | 'describe' | 'it'

/** Mock global functions for various test runners */
function mockGlobal(methods: globals[] , remove = false) {
  methods.forEach(method => {
    if (remove) {
      global[method] = null as any
    } else {
      global[method] = (() => {}) as any
    }
  })
}
