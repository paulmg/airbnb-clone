import { ThemeProvider } from '@/app/theme-provider';
import { Toaster } from '@/components/ui/toaster';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </>
  )
}

export default Providers;
