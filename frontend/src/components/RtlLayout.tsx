import { useEffect, ReactNode } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// material
import { StylesProvider } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

type RtlLayoutProps = {
  children?: ReactNode;
};

export default function RtlLayout({ children }: RtlLayoutProps) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cache = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    prepend: true,
    // @ts-ignore
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : []
  });

  cache.compat = true;

  return (
    <CacheProvider value={cache}>
      <StylesProvider>{children}</StylesProvider>
    </CacheProvider>
  );
}
