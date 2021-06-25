import { useContext } from 'react';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { Language } from '../const/language';

import commonEn from '../translates/en/common.json';

type CommonTranslate = {
  projectName: string,
};

export function useCommonTranslate():CommonTranslate {
  const { language } = useContext(AppSettingsContext);

  switch (language) {
    case Language.En:
      return commonEn;
    default:
      return commonEn;
  }
}
