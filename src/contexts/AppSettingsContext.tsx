import React, {
  FC,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import { Language } from '../const/language';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ea7f7f',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#19335a',
      secondary: '#fff',
    },
  },
  overrides: {
  },
});

type AppSettingsContextValue = {
  language: Language,
  theme: Theme,
};

export const AppSettingsContext = React.createContext<AppSettingsContextValue>({
  language: Language.En,
  theme,
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
      theme,
    }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppSettingsContext.Provider>
  );
};
