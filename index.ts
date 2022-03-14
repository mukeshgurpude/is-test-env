type Globals = { [key: string]: any }

/** Check if script is running under test environment */
export default function is_test_env(globals: Globals = {}): boolean {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'undefined') return process.env.NODE_ENV === 'test'
  let { Gcontext, Gdescribe, Git, Gsetup, Gsuite, Gtest } = get_global(globals)
  try {
    if (
      (typeof Gsuite === 'function' && typeof Gtest === 'function' && typeof Gsetup === 'function') || // Mocha tdd
      (typeof Gdescribe === 'function' && typeof Git === 'function' && typeof Gtest === 'function') || // jest
      (typeof Gdescribe === 'function' && typeof Git === 'function' && typeof Gcontext === 'function') // Mocha bdd
    ) return true
  } catch {}
  return false
}

/** Get value of global variables */
function get_global(globals: Globals) {
  let Gcontext, Gdescribe, Git, Gsetup, Gsuite, Gtest;
  try { Gcontext = context } catch { Gcontext = globals.context }
  try { Gdescribe = describe } catch { Gdescribe = globals.describe }
  try { Git = it } catch { Git = globals.it }
  try { Gsetup = setup } catch { Gsetup = globals.setup }
  try { Gsuite = suite } catch { Gsuite = globals.suite }
  try { Gtest = test } catch { Gtest = globals.test }
  
  return { Gcontext, Gdescribe, Git, Gsetup, Gsuite, Gtest }
}
