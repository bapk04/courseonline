/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Layout/Navbar.tsx
'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    router.push('/');
  };

  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ bgcolor: '#fff' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                CourseOnline
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link href="/courses" style={{ textDecoration: 'none' }}>
              <Button variant="text">Courses</Button>
            </Link>

            <IconButton size="large" aria-label="cart" onClick={() => router.push('/checkout')}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!isAuthenticated ? (
              <>
                <Button variant="outlined" onClick={() => router.push('/login')}>Log In</Button>
                <Button variant="contained" onClick={() => router.push('/signup')}>Sign Up</Button>
              </>
            ) : (
              <>
                <IconButton onClick={handleOpenMenu} size="small" sx={{ ml: 1 }}>
                  <Avatar alt={currentUser?.name ?? 'U'}>{(currentUser?.name ?? 'U')[0]}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { handleCloseMenu(); router.push('/my-courses'); }}>My Courses</MenuItem>
                  <MenuItem onClick={() => { handleCloseMenu(); router.push('/profile'); }}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
