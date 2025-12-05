"use client";

import React from "react";
import { Grid } from "@mui/material";
import CourseCard from "./CourseCard";
import { Course } from "@/types/course";

export default function CourseList({ courses }: { courses: Course[] }) {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}
