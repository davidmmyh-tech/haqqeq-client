import Footer from '@/components/sections/Footer';
import NavBar from '@/components/sections/NavBar';
import SideNavBar from '@/components/sections/SideNavBar';
import { useState } from 'react';
import { Outlet } from 'react-router';
import AppWrapper from './AppWrapper';

export default function MainLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <AppWrapper>
      <NavBar onOpenSideBar={() => setIsSideBarOpen(true)} />
      <SideNavBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </AppWrapper>
  );
}
