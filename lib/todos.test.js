import {
  addTodo,
  clearDone,
  countDone,
  countRemaining,
  deleteTodo,
  editTodo,
  filterTodos,
  isValidTodoText,
  sortTodos,
  toggleTodo,
} from './todos'

const sample = [
  { id: 'a', text: '牛乳を買う', done: false },
  { id: 'b', text: 'レポート提出', done: true },
]

describe('addTodo', () => {
  test('末尾に未完了の TODO が1件増える', () => {
    const result = addTodo(sample, '部屋の掃除')
    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({ id: expect.any(String), text: '部屋の掃除', done: false })
  })

  test('元の配列は書き換えない', () => {
    const result = addTodo(sample, '部屋の掃除')
    expect(result).not.toBe(sample)
    expect(sample).toHaveLength(2)
  })
})

describe('toggleTodo', () => {
  test('指定した id の done だけが反転する', () => {
    const result = toggleTodo(sample, 'a')
    expect(result[0].done).toBe(true)
    expect(result[1].done).toBe(true)
  })

  test('元の TODO オブジェクトは書き換えない', () => {
    toggleTodo(sample, 'a')
    expect(sample[0].done).toBe(false)
  })

  test('変更していない TODO は同じオブジェクトのまま', () => {
    const result = toggleTodo(sample, 'a')
    expect(result[1]).toBe(sample[1])
  })
})

describe('deleteTodo', () => {
  test('指定した id の TODO だけが消える', () => {
    const result = deleteTodo(sample, 'a')
    expect(result).toEqual([{ id: 'b', text: 'レポート提出', done: true }])
  })

  test('存在しない id なら何も消えない', () => {
    const result = deleteTodo(sample, 'zzz')
    expect(result).toEqual(sample)
  })

  test('元の配列は書き換えない', () => {
    const result = deleteTodo(sample, 'a')
    expect(result).not.toBe(sample)
    expect(sample).toHaveLength(2)
  })
})

describe('countRemaining', () => {
  test('未完了の数を返す', () => {
    expect(countRemaining(sample)).toBe(1)
  })

  test('0件なら 0', () => {
    expect(countRemaining([])).toBe(0)
  })

  test('すべて完了なら 0', () => {
    const allDone = [
      { id: 'x', text: 'A', done: true },
      { id: 'y', text: 'B', done: true },
    ]
    expect(countRemaining(allDone)).toBe(0)
  })
})

describe('countDone', () => {
  test('完了済みの数を返す', () => {
    expect(countDone(sample)).toBe(1)
  })
})

describe('isValidTodoText', () => {
  test('普通の文字列は OK', () => {
    expect(isValidTodoText('牛乳を買う')).toBe(true)
  })
  test('空文字は NG', () => {
    expect(isValidTodoText('')).toBe(false)
  })
  test('空白だけは NG', () => {
    expect(isValidTodoText('   ')).toBe(false)
  })
  test('50文字ちょうどは OK', () => {
    expect(isValidTodoText('あ'.repeat(50))).toBe(true)
  })
  test('51文字は NG', () => {
    expect(isValidTodoText('あ'.repeat(51))).toBe(false)
  })
})

describe('filterTodos', () => {
  test.each([
    ['all', ['a', 'b']],
    ['active', ['a']],
    ['done', ['b']],
  ])('%s のとき id が %j の TODO が残る', (filter, expectedIds) => {
    const result = filterTodos(sample, filter)
    expect(result.map((todo) => todo.id)).toEqual(expectedIds)
  })
})

describe('clearDone', () => {
  test('完了済みが消え、未完了だけが残る', () => {
    expect(clearDone(sample)).toEqual([{ id: 'a', text: '牛乳を買う', done: false }])
  })

  test('完了済みがなければ中身は同じ', () => {
    const todos = [{ id: 'x', text: 'X', done: false }]
    expect(clearDone(todos)).toEqual(todos)
  })

  test('元の配列は書き換えない', () => {
    clearDone(sample)
    expect(sample).toHaveLength(2)
  })
})

describe('editTodo', () => {
  test('text だけが変わる', () => {
    const result = editTodo(sample, 'b', '企画書提出')
    expect(result[1]).toEqual({ id: 'b', text: '企画書提出', done: true })
  })

  test('前後の空白は取り除く', () => {
    const result = editTodo(sample, 'a', '  豆乳を買う  ')
    expect(result[0].text).toBe('豆乳を買う')
  })

  test('空なら元の配列をそのまま返す', () => {
    expect(editTodo(sample, 'a', '   ')).toBe(sample)
  })

  test('元のオブジェクトは書き換えない', () => {
    editTodo(sample, 'a', '豆乳を買う')
    expect(sample[0].text).toBe('牛乳を買う')
  })
})

describe('sortTodos', () => {
  const mixed = [
    { id: '1', text: 'A', done: true },
    { id: '2', text: 'B', done: false },
    { id: '3', text: 'C', done: true },
    { id: '4', text: 'D', done: false },
  ]

  test.each([
    ['created', ['1', '2', '3', '4']],
    ['undone-first', ['2', '4', '1', '3']],
  ])('%s のとき id が %j の順に並ぶ', (order, expectedIds) => {
    const result = sortTodos(mixed, order)
    expect(result.map((todo) => todo.id)).toEqual(expectedIds)
  })

  test('元の配列は書き換えない', () => {
    sortTodos(mixed, 'undone-first')
    expect(mixed.map((todo) => todo.id)).toEqual(['1', '2', '3', '4'])
  })
})
