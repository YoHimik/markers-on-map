import React, {
  FC, ReactElement, ReactNode, useState,
} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Language } from '../const/language';

const theme = createMuiTheme({
  overrides: {
  },
});

type AppSettingsContextValue = {
  language: Language,
};

export const AppSettingsContext = React.createContext<AppSettingsContextValue>({
  language: Language.En,
});

type AppSettingsContextProviderProps = {
  children: ReactNode,
};

export const AppSettingsContextProvider: FC<AppSettingsContextProviderProps> = (props): ReactElement => {
  const { children } = props;

  const [language] = useState<Language>(Language.En);

  return (
    <AppSettingsContext.Provider value={{
      language,
    }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppSettingsContext.Provider>
  );
};
