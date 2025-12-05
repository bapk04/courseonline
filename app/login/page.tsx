// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; // <-- added
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) {
      router.push('/');
    } else {
      setErr(res.message ?? 'Login failed');
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ maxWidth: 480, mx: 'auto', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Log In</Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" fullWidth />
            {err && <Typography color="error">{err}</Typography>}
            <Button type="submit" variant="contained">Log In</Button>
            <Button variant="text" onClick={() => router.push('/forgot-password')}>Forgot password?</Button>
            <Button variant="outlined" onClick={() => router.push('/signup')}>Create account</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
