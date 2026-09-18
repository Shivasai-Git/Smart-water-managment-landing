export function MetricReadout({ label, value, unit, note }: { label: string; value: string | number; unit?: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-body text-xs text-steel">{label}</span>
      <span className="font-mono text-3xl text-mist">
        {value}
        {unit ? <span className="text-base text-steel ml-1">{unit}</span> : null}
      </span>
      {note ? <span className="font-body text-xs text-steel">{note}</span> : null}
    </div>
  );
}
