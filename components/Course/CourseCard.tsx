// components/Course/CourseCard.tsx
'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Course } from '@/types/course';

import Rating from '@mui/material/Rating';
import { useCart } from '../../context/CartContext';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/navigation';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState<string>('');

  const handleAdd = () => {
    const res = addToCart({ id: course.id, title: course.title, price: course.price, image: course.image });
    setMsg(res.ok ? 'Added to cart' : res.message ?? 'Already in cart');
    setOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 6px 18px rgba(15, 20, 25, .06)',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
          '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 10px 30px rgba(15,20,25,.12)' },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardMedia component="img" height="160" image={course.image} alt={course.title} sx={{ objectFit: 'cover' }} />
        <CardContent sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Chip label={course.category} size="small" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={course.rating} readOnly precision={0.1} size="small" />
              <Typography variant="caption" sx={{ ml: 0.5 }}>{course.rating}</Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, mb: 1 }}>{course.title}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, whiteSpace: 'pre-line' }}>
            {course.description}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{course.price}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" size="small" onClick={() => router.push(`/courses/${course.id}`)}>View</Button>
              <Button variant="contained" size="small" onClick={handleAdd}>Add to cart</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} message={msg} />
    </>
  );
}
