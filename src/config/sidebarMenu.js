// src/config/sidebarMenu.js
import { LayoutDashboard, Image, Bell, Clock,Youtube } from 'lucide-react';

export const sidebarMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Gallery', icon: Image, path: '/dashboard/gallery' },
  { label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
  { label: 'History', icon: Clock, path: '/dashboard/history' },
  { label: 'Brands', icon: Youtube, path: '/dashboard/brands' },
];