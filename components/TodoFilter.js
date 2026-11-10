const filters = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'done', label: '完了' },
]

export default function TodoFilter({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', margin: '8px 0' }}>
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{ fontWeight: value === f.value ? 'bold' : 'normal' }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
