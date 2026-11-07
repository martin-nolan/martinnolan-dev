import { Svg } from './Svg';

type FigureProps = {
  number: string;
  name: string;
  caption: string;
  className?: string;
};

// Figures with the `scroll` class animate as they come into view, where the browser
// supports scroll-driven animation. Elsewhere they are simply shown.
export function Figure({ number, name, caption, className }: FigureProps) {
  return (
    <figure className={['fig', 'scroll', className].filter(Boolean).join(' ')}>
      <div className="fig-panel">
        <Svg name={name} />
      </div>
      <figcaption>
        <span className="fig-no">Fig. {number}</span> {caption}
      </figcaption>
    </figure>
  );
}
