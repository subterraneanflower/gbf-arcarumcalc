import * as React from 'react';

export interface AppContextData {
  installPrompt?: any;
  setInstallPrompt: (prompt: any) => any;
}

export const AppContext = React.createContext<AppContextData>({
  setInstallPrompt: (propmpt: any) => null
});
