// app/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock: just show snackbar
    setSnack({ open: true, msg: 'If this email exists, a reset link has been sent (mock).' });
    setTimeout(() => router.push('/login'), 1500);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ maxWidth: 520, mx: 'auto', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Reset password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Button type="submit" variant="contained">Send reset link</Button>
        </form>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ open: false, msg: '' })} message={snack.msg} />
    </Container>
  );
}
