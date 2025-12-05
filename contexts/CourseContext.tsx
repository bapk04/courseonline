"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "../types/course";

interface CourseContextProps {
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // tạo dữ liệu mẫu
    const data: Course[] = [
      {
        id: "1",
        title: "Khóa học lập trình Next.js 16",
        price: 499000,
        description: "Học Next.js phiên bản mới nhất với App Router.",
        thumbnail: "/images/nextjs.png",
        category: "Web Development",
      },
      {
        id: "2",
        title: "React 19 Masterclass",
        price: 399000,
        description: "Nắm vững React 19 với các hooks mới nhất.",
        thumbnail: "/images/react.png",
        category: "Frontend",
      },
    ];

    setCourses(data);
  }, []);

  const getCourseById = (id: string) => courses.find((c) => c.id === id);

  return (
    <CourseContext.Provider value={{ courses, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourses must be inside CourseProvider");
  return ctx;
};
