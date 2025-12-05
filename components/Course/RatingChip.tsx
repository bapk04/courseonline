// components/Course/RatingChip.tsx
import React from 'react';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';

export default function RatingChip({ rating }: { rating: number }) {
  return <Chip icon={<StarIcon />} label={rating.toFixed(1)} size="small" />;
}
