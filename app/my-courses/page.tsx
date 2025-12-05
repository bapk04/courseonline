/* eslint-disable @next/next/no-img-element */
// app/my-courses/page.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ProtectedRoute from '../../components/Common/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function MyCoursesPage() {
  return (
    <ProtectedRoute>
      <MyCoursesInner />
    </ProtectedRoute>
  );
}

function MyCoursesInner() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const myCourses = currentUser.myCourses ?? [];

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>My Courses</Typography>

      {myCourses.length === 0 ? (
        <Paper sx={{ p: 4 }}>
          <Typography>You don not have any courses yet. Browse courses to start learning.</Typography>
          <Button sx={{ mt: 2 }} variant="contained" component={Link} href="/courses">Browse Courses</Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {myCourses.map((c) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={c.id}>
              <Paper sx={{ overflow: 'hidden' }}>
                <img src={c.image} alt={c.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                <div style={{ padding: 12 }}>
                  <Typography variant="h6">{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{c.price}</Typography>
                  <Button variant="contained" sx={{ mt: 1 }} component={Link} href={`/courses/${c.id}`}>
                    Start Learning
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
