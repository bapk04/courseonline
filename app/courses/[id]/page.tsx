/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/courses/[id]/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import VideoPlayer from '../../../components/Video/VideoPlayer';
import { courses } from '../../../data/courses';
import { useCart } from '../../../context/CartContext';
import { parsePrice } from '../../../components/Utils/PriceUtils';

export default function CourseDetailPage() {
  const params = useParams() as { id?: string };
  const id = params?.id ?? '';
  const course = useMemo(() => courses.find((c) => c.id === id), [id]);
  const router = useRouter();
  const { addToCart } = useCart();
  const [openVideo, setOpenVideo] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });

  if (!course) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h6">Course not found</Typography>
      </Container>
    );
  }

  const handleAdd = () => {
    const res = addToCart({ id: course.id, title: course.title, price: course.price, image: course.image });
    setSnack({ open: true, msg: res.ok ? 'Added to cart' : res.message ?? 'Already in cart' });
  };

  const handleBuyNow = () => {
    addToCart({ id: course.id, title: course.title, price: course.price, image: course.image });
    router.push('/checkout');
  };

  const priceNumber = parsePrice(course.price);

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{course.title}</Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1, mb: 2 }}>
            <Chip label={course.category} />
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Rating value={course.rating} readOnly precision={0.1} size="small" />
              <Typography variant="body2">{course.rating}</Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontWeight: 800, marginLeft: 'auto' }}>{course.price}</Typography>
          </Stack>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6">What you&apos;ll learn</Typography>
            <List>
              <ListItem>
                <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                Build real-world applications using Next.js 16.
              </ListItem>
              <ListItem>
                <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                Understand App Router and server/client components.
              </ListItem>
              <ListItem>
                <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                Deploy and optimize for production.
              </ListItem>
            </List>
          </Paper>

          <Typography variant="h6">Course description</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>{course.description}</Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 96 }, alignSelf: 'start' }}>
            <Paper sx={{ overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => setOpenVideo(true)}>
                <img src={course.image} alt={course.title} style={{ width: '100%', height: 210, objectFit: 'cover' }} />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                    </svg>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{course.price}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{course.category}</Typography>

                <Button fullWidth variant="contained" sx={{ mb: 1 }} onClick={handleAdd}>
                  Add to Cart
                </Button>
                <Button fullWidth variant="outlined" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ mt: 2, p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Instructor</Typography>
              <Typography variant="body2" color="text.secondary">Course Author</Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <VideoPlayer open={openVideo} onClose={() => setOpenVideo(false)} videoUrl={course.videoUrl} title={course.title} />

      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ open: false, msg: '' })} message={snack.msg} />
    </Container>
  );
}
