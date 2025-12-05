// components/Layout/Footer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, py: 6, bgcolor: '#fff', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} CourseOnline. All rights reserved.</Typography>
        <Box>
          <Link href="/terms" style={{ marginRight: 12 }}>Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </Box>
      </Container>
    </Box>
  );
}
