// app/layout.tsx
import './globals.css';
import ThemeRegistry from '../lib/theme/ThemeRegistry';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

export const metadata = {
  title: 'CourseOnline',
  description: 'Online course platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
