import { boardTypes } from '../../data/options'
import type { BoardCode } from '../../types/booking'

interface BoardTypeRadioGroupProps {
  value: BoardCode | ''
  onChange: (code: BoardCode) => void
  error?: string
}

export const BoardTypeRadioGroup = ({
  value,
  onChange,
  error,
}: BoardTypeRadioGroupProps) => (
  <div className="space-y-2">
    <div className="grid gap-3 sm:grid-cols-3">
      {boardTypes.map((board) => (
        <label
          key={board.code}
          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand"
        >
          <input
            type="radio"
            name="boardType"
            value={board.code}
            checked={value === board.code}
            onChange={() => onChange(board.code)}
            className="mt-1 h-4 w-4 border-slate-300 text-brand focus:ring-brand"
          />
          <div>
            <p className="text-sm font-semibold text-slate-800">{board.name}</p>
            <p className="text-xs text-slate-500">{board.description}</p>
          </div>
        </label>
      ))}
    </div>
    {error ? <p className="text-xs text-rose-600">{error}</p> : null}
  </div>
)

