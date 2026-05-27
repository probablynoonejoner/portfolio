import { lazy, Suspense } from 'react';

const CTAWords = lazy(() => import('./CTAWords'));

export default function LazyCTAWords({ text, href, className }) {
  return (
    <Suspense fallback={<a href={href} className={className}>{text}</a>}>
      <CTAWords text={text} href={href} className={className} />
    </Suspense>
  );
}
