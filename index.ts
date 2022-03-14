export default function is_test_env(): boolean {
  if (process.env.NODE_ENV) return process.env.NODE_ENV === 'test'

  try {
    if (
      (typeof suite === 'function' && typeof test === 'function' && typeof setup === 'function') || // Mocha tdd
      (typeof describe === 'function' && typeof it === 'function' && typeof test === 'function') || // jest
      (typeof describe === 'function' && typeof it === 'function' && typeof context === 'function') // Mocha bdd
    ) return true
  } catch {}
  return false
}
