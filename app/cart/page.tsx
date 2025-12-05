// app/cart/page.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useCart } from '../../context/CartContext';
import { parsePrice, formatPrice } from '../../components/Utils/PriceUtils';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((s, it) => s + parsePrice(it.price), 0);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Your Cart</Typography>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <Typography variant="subtitle1">{c.title}</Typography>
                </TableCell>
                <TableCell>{c.price}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => removeFromCart(c.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
            {cart.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}><Typography color="text.secondary">Your cart is empty.</Typography></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Typography variant="h6" sx={{ mt: 2 }}>Total: {formatPrice(total)}</Typography>

        <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push('/checkout')} disabled={cart.length === 0}>Checkout</Button>
      </Paper>
    </Container>
  );
}
