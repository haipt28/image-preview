import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ReactElement, ReactNode } from "react";

interface IGlobalProvider {
  children: ReactNode | ReactElement | JSX.Element;
}

export const GlobalProvider = (props: IGlobalProvider) => {
  const { children } = props;

  const emotionCache = createCache({ key: "css" });
  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
};
