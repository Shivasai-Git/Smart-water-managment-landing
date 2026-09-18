// src/features/sections/SectionsPage.tsx
import { useNavigate } from 'react-router-dom';
import { useScenario } from '../../state/scenario';
import { RiserList } from '../../components/ui/RiserList';

export default function SectionsPage() {
  const { sections } = useScenario();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-mist">My Home</h1>
      <p className="font-body text-sm text-steel max-w-lg">
        Every section below is fed from the same main supply line. Select one to see its flow history, leak events, and valve state.
      </p>
      <section className="rounded-2xl border border-steel/20 bg-ink2 p-5">
        <RiserList sections={sections} onSelect={(id) => navigate(`/app/sections/${id}`)} />
      </section>
    </div>
  );
}
