import React, { Suspense } from 'react';
import { ApiNameListResponse } from '../utils/apicalls';
import NameListSection from './NameListSection';
import SectionSkeleton from './SectionSkeleton';

type Props = {
  title: string;
  delayMs: number;
  dataPromise: Promise<ApiNameListResponse>;
};

export default function SuspenseNameSection({ title, delayMs, dataPromise }: Props) {
  return (
    <Suspense
      fallback={
        <SectionSkeleton title={title} description={`Waiting ${delayMs} ms for ${title}`} />
      }
    >
      <NameListSection dataPromise={dataPromise} />
    </Suspense>
  );
}
