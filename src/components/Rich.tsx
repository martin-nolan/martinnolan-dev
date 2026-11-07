import { Fragment } from 'react';

// Renders copy where ==text== marks a highlighted phrase.
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('==').map((part, index) => (
        <Fragment key={index}>{index % 2 === 1 ? <mark>{part}</mark> : part}</Fragment>
      ))}
    </>
  );
}
