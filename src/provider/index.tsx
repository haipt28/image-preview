import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { ReactElement, ReactNode } from "react";

interface IGlobalProvider {
  children: ReactNode | ReactElement | JSX.Element;
}

export const GlobalProvider = (props: IGlobalProvider) => {
  const { children } = props;

  const emotionCache = createCache({ key: "css" });
  return (
    <CacheProvider value={emotionCache}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </CacheProvider>
  );
};
