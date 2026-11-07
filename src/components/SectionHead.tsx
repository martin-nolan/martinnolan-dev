export function SectionHead({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <div className="section-head">
      <span className="section-no" aria-hidden="true">
        {number}
      </span>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
