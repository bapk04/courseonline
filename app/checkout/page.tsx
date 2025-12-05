// app/checkout/page.tsx
'use client';

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { parsePrice, formatPrice } from '../../components/Utils/PriceUtils';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { currentUser, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });

  const total = cart.reduce((s, it) => s + parsePrice(it.price), 0);

  const handleCheckout = () => {
    if (!isAuthenticated || !currentUser) {
      router.push('/login');
      return;
    }

    // Append cart items to currentUser.myCourses (avoid duplicates)
    const existingIds = new Set(currentUser.myCourses.map((c) => c.id));
    const newCourses = cart.filter((c) => !existingIds.has(c.id));
    const nextUser = {
      ...currentUser,
      myCourses: [...currentUser.myCourses, ...newCourses],
    };

    updateUser(nextUser);
    clearCart();
    setSnack({ open: true, msg: 'Order placed successfully!' });

    setTimeout(() => {
      router.push('/my-courses');
    }, 900);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Checkout</Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1">Items: {cart.length}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Total: {formatPrice(total)}</Typography>

        <Button variant="contained" sx={{ mt: 3 }} onClick={handleCheckout} disabled={cart.length === 0}>
          Checkout
        </Button>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ open: false, msg: '' })} message={snack.msg} />
    </Container>
  );
}
