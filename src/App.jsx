import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import FloatingCTA from './components/layout/FloatingCTA.jsx'
import SkipLink from './components/layout/SkipLink.jsx'
import Cursor from './components/effects/Cursor.jsx'
import Loader from './components/effects/Loader.jsx'
import PageTransition from './components/effects/PageTransition.jsx'
import AltitudeShift from './components/effects/AltitudeShift.jsx'
import TimeOfDay from './components/effects/TimeOfDay.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetail from './pages/RoomDetail.jsx'
import Gallery from './pages/Gallery.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cafe from './pages/Cafe.jsx'
import Menu from './pages/Menu.jsx'
import Cakes from './pages/Cakes.jsx'
import Events from './pages/Events.jsx'
import Reviews from './pages/Reviews.jsx'
import NotFound from './pages/NotFound.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminRooms from './pages/admin/AdminRooms.jsx'
import AdminMenu from './pages/admin/AdminMenu.jsx'
import AdminGallery from './pages/admin/AdminGallery.jsx'
import AdminBookings from './pages/admin/AdminBookings.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import { scrollToTop } from './lib/smoothScroll.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const t = setTimeout(() => scrollToTop(true), 50)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/rooms" element={<ProtectedRoute><AdminRooms /></ProtectedRoute>} />
        <Route path="/admin/menu" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
      </Routes>
    )
  }

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      <SkipLink />
      <ScrollToTop />
      <Cursor />
      <Loader />
      <PageTransition />
      <AltitudeShift />
<TimeOfDay />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:slug" element={<RoomDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cakes" element={<Cakes />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
