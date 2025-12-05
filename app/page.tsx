/* eslint-disable @next/next/no-img-element */
// app/page.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { courses } from '../data/courses';

export default function HomePage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h1" gutterBottom>CourseOnline</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        A minimal starter home. Browse our featured courses below.
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {courses.slice(0, 4).map((c) => (
          <Link key={c.id} href={`/courses/${c.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', background: '#fff' }}>
              <img src={c.image} alt={c.title} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{c.title}</div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>{c.category} • {c.rating} ⭐</div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>{c.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
