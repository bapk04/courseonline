// components/Video/VideoPlayer.tsx
'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  videoUrl: string; // embed URL like https://www.youtube.com/embed/xxxxx
  title?: string;
}

export default function VideoPlayer({ open, onClose, videoUrl, title }: Props) {
  // ensure autoplay param
  const src = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ position: 'relative', pt: '56.25%' /* 16:9 */ }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 10, bgcolor: 'rgba(255,255,255,0.9)' }}
        >
          <CloseIcon />
        </IconButton>

        <iframe
          title={title ?? 'Video Player'}
          width="100%"
          height="100%"
          style={{ position: 'absolute', left: 0, top: 0, border: 0 }}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Dialog>
  );
}
