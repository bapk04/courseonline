// app/profile/page.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/Common/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileInner />
    </ProtectedRoute>
  );
}

function ProfileInner() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  if (!currentUser) return null;

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 4, maxWidth: 800 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Profile</Typography>
          <Typography variant="body1"><strong>Name:</strong> {currentUser.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => router.push('/my-courses')}>My Courses</Button>
            <Button variant="outlined" color="error" onClick={() => { logout(); router.push('/'); }}>Logout</Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
