// app/courses/page.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CourseList from '../../components/Course/CourseList';
import { courses } from '../../data/courses';

export default function CoursesPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>All Courses</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Browse our available courses — filter and search coming soon.
      </Typography>

      <Box>
        <CourseList courses={courses} />
      </Box>
    </Container>
  );
}
