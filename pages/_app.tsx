import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1 py-6">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
