import React from 'react';
import { PageTitle } from '../src/components/common/PageTitle';
import { AvailabilityMap } from '../src/components/AvailabilityMap';
import { useCommonTranslate } from '../src/hooks/useTranslateOnUserLanguage';

export default function IndexPage() {
  const { projectName } = useCommonTranslate();

  return (
    <>
      <PageTitle title={projectName} />
      <AvailabilityMap />
    </>
  );
}
