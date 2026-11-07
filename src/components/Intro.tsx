import { Rich } from './Rich';

// A section opening: a pull line in the display face, then the body copy.
export function Intro({ pull, text }: { pull: string; text: string }) {
  return (
    <div className="two-col reveal">
      <p className="pull">{pull}</p>
      <p>
        <Rich text={text} />
      </p>
    </div>
  );
}
