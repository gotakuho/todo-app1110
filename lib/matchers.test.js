// lib/matchers.test.js（練習用。試したら消してよい）

test('マッチャーの練習', () => {
  expect(1 + 2).toBe(3) // 値が同じ
  expect({ text: 'a', done: false }).toEqual({ text: 'a', done: false }) // 中身が同じ
  expect([1, 2, 3]).toHaveLength(3) // 長さ
  expect(['りんご', 'バナナ']).toContain('バナナ') // 含んでいる
  expect('TODOアプリ').toMatch(/TODO/) // 文字列のパターン
  expect(null).toBeNull() // null である
  expect(5).toBeGreaterThan(3) // より大きい
  expect(1 + 1).not.toBe(3) // not で否定
})
