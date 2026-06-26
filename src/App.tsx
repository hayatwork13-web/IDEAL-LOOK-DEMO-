import { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Scissors,
  Crown,
  Star,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle2,
  Calendar,
  Award,
  ShieldCheck,
  Menu,
  X,
  MessageCircle,
  Flower2,
  Gift,
  HelpCircle,
  Compass,
  ArrowRight,
  Instagram,
  Facebook
} from 'lucide-react';

import { SERVICES, TESTIMONIALS } from './data';
import { Service, BookingState } from './types';

export default function App() {
  // Mobile Nav Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Category Filter for Services
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Testimonial Slider State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Custom Interactive Booking State
  const [booking, setBooking] = useState<BookingState>({
    selectedServiceIds: ['party-glam'], // default selected for demonstration
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // tomorrow
    time: '14:00',
    name: '',
    notes: ''
  });

  // Simple feedback when request callback is clicked
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return SERVICES;
    return SERVICES.filter(service => service.category === activeCategory);
  }, [activeCategory]);

  // Handle toggling services in booking builder
  const toggleServiceInBooking = (serviceId: string) => {
    setBooking(prev => {
      const isSelected = prev.selectedServiceIds.includes(serviceId);
      const updated = isSelected
        ? prev.selectedServiceIds.filter(id => id !== serviceId)
        : [...prev.selectedServiceIds, serviceId];
      return { ...prev, selectedServiceIds: updated };
    });
  };

  // Get service details for selected ones
  const selectedServicesList = useMemo(() => {
    return SERVICES.filter(s => booking.selectedServiceIds.includes(s.id));
  }, [booking.selectedServiceIds]);

  // Generate pre-filled WhatsApp link with selection details
  const whatsappUrl = useMemo(() => {
    const baseUrl = 'https://wa.me/923146867612';
    
    if (booking.selectedServiceIds.length === 0) {
      return `${baseUrl}?text=${encodeURIComponent('Hello Ideal Look Salon, I would like to book an appointment.')}`;
    }

    const serviceNames = selectedServicesList.map(s => `• ${s.name} (${s.priceText})`).join('\n');
    const message = `Hello Ideal Look Salon,

I would like to request an appointment with the following details:

*Selected Services:*
${serviceNames}

*Preferred Date:* ${booking.date}
*Preferred Time:* ${booking.time}
*My Name:* ${booking.name || 'Valued Client'}
${booking.notes ? `\n*Additional Note:* ${booking.notes}` : ''}

Please confirm availability. Thank you!`;

    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }, [booking, selectedServicesList]);

  // Navigation smoothly scrolls to element by id
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger callback request
  const handleRequestCallback = (e: FormEvent) => {
    e.preventDefault();
    if (!booking.name) return;
    setCallbackSuccess(true);
    setTimeout(() => {
      setCallbackSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-brand-bg-primary text-brand-text selection:bg-brand-accent-pink selection:text-white font-sans overflow-x-hidden">
      
      {/* DECORATIVE AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-bg-secondary rounded-full filter blur-[150px] opacity-40 pointer-events-none -z-10" />
      <div className="absolute top-[200vh] right-0 w-[500px] h-[500px] bg-brand-bg-secondary rounded-full filter blur-[130px] opacity-30 pointer-events-none -z-10" />
      <div className="absolute top-[400vh] left-10 w-[600px] h-[600px] bg-[#fff0f5] rounded-full filter blur-[160px] opacity-45 pointer-events-none -z-10" />

      {/* HEADER / FLOATING NAVIGATION */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-brand-bg-primary/85 border-b border-brand-border/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Monogram & Name */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-11 h-11 rounded-full border border-brand-rose-gold bg-brand-bg-secondary flex items-center justify-center shadow-sm">
                <span className="font-serif text-lg font-semibold text-brand-rose-gold tracking-widest">IL</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-brand-text block">
                  Ideal Look
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-accent-pink block font-medium">
                  Salon & Bridal Studio
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-brand-accent-pink transition-colors">About Us</button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-brand-accent-pink transition-colors">Services</button>
              <button onClick={() => scrollToSection('bridal')} className="text-sm font-medium hover:text-brand-accent-pink transition-colors">Bridal Studio</button>
              <button onClick={() => scrollToSection('why-us')} className="text-sm font-medium hover:text-brand-accent-pink transition-colors">Why Choose Us</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium hover:text-brand-accent-pink transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-brand-accent-pink transition-colors">Contact</button>
            </div>

            {/* Header Booking Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="https://wa.me/923146867612?text=Hello%20Ideal%20Look%20Salon%2C%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="referrer noopener"
                className="inline-flex items-center space-x-2 bg-brand-accent-pink text-white text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-full shadow-md hover:bg-[#d6557e] transition-all duration-300 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp</span>
              </a>
              <button 
                onClick={() => scrollToSection('booking-builder')}
                className="border border-brand-rose-gold text-brand-rose-gold text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-full hover:bg-brand-rose-gold hover:text-white transition-all duration-300"
              >
                Book Custom Look
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-brand-text p-2 rounded-md hover:text-brand-accent-pink focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-bg-primary border-b border-brand-border"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 px-3 text-base font-medium text-brand-text hover:bg-brand-bg-secondary rounded-lg">About Us</button>
                <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 px-3 text-base font-medium text-brand-text hover:bg-brand-bg-secondary rounded-lg">Services & Prices</button>
                <button onClick={() => scrollToSection('bridal')} className="block w-full text-left py-2 px-3 text-base font-medium text-brand-text hover:bg-brand-bg-secondary rounded-lg">Bridal Special</button>
                <button onClick={() => scrollToSection('why-us')} className="block w-full text-left py-2 px-3 text-base font-medium text-brand-text hover:bg-brand-bg-secondary rounded-lg">Why Choose Us</button>
                <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 px-3 text-base font-medium text-brand-text hover:bg-brand-bg-secondary rounded-lg">Client Reviews</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 px-3 text-base font-medium text-brand-text hover:bg-brand-bg-secondary rounded-lg">Contact & Location</button>
                
                <div className="pt-4 flex flex-col space-y-2">
                  <a 
                    href="https://wa.me/923146867612?text=Hello%20Ideal%20Look%20Salon%2C%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="referrer noopener"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-brand-accent-pink text-white py-3 rounded-full font-semibold text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Booking</span>
                  </a>
                  <button 
                    onClick={() => scrollToSection('booking-builder')}
                    className="w-full text-center border border-brand-rose-gold text-brand-rose-gold py-3 rounded-full font-semibold text-sm hover:bg-brand-rose-gold hover:text-white transition"
                  >
                    Custom Booking Builder
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-8 pb-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Side */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Premium Top Badge */}
              <div className="inline-flex items-center space-x-2 bg-brand-bg-secondary border border-brand-border py-1.5 px-4 rounded-full">
                <Sparkles className="w-4 h-4 text-brand-accent-pink animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-accent-pink">
                  Premium Ladies Salon & Bridal Studio
                </span>
              </div>

              {/* Master Display Typography */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-brand-text leading-[1.15]">
                Unveil Your <br />
                <span className="font-semibold italic text-brand-rose-gold">Signature Glow</span> <br />
                with Absolute Luxury
              </h1>

              {/* Sophisticated Slogan */}
              <p className="text-brand-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Hyderabad's trusted sanctuary for magnificent bridal makeup, expert hair transformations, and premium skincare therapies. Experience bespoke beauty tailored exclusively for you.
              </p>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('booking-builder')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-accent-pink text-white font-medium py-4 px-8 rounded-full shadow-lg hover:bg-[#d6557e] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <span>Build Custom Package & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="w-full sm:w-auto inline-flex items-center justify-center border border-brand-border bg-white text-brand-text font-medium py-4 px-8 rounded-full hover:bg-brand-bg-secondary hover:border-brand-accent-pink/30 transition-all duration-300 cursor-pointer"
                >
                  View Premium Services
                </button>
              </div>

              {/* Trust Google Review Indicator */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 pt-6 border-t border-brand-border/40 max-w-md mx-auto lg:mx-0">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-brand-muted font-medium">
                  <span className="text-brand-text font-semibold text-sm block sm:inline">4.1 Stars on Google Reviews</span>
                  <span className="sm:ml-2">(20+ Verified Client Reviews)</span>
                </div>
              </div>

            </div>

            {/* Hero Visual Block (Luxury Abstract Geometry Frame) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer soft shadow background layer */}
              <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] bg-white rounded-3xl -rotate-6 shadow-xl border border-brand-border/40" />
              
              {/* Main Luxury Border Frame Box */}
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] bg-brand-bg-secondary rounded-3xl rotate-3 border-2 border-brand-rose-gold/40 shadow-xl flex flex-col justify-between p-8 overflow-hidden">
                
                {/* Abstract Geometric Waves and Mandalas using SVG in place of images */}
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                  <svg className="w-full h-full text-brand-rose-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="30" strokeWidth="0.7" />
                    <circle cx="50" cy="50" r="20" strokeWidth="0.5" strokeDasharray="3 1" />
                    <path d="M50 0 V100 M0 50 H100 M15 15 L85 85 M15 85 L85 15" strokeWidth="0.2" />
                  </svg>
                </div>

                {/* Sparkling Icons */}
                <div className="flex justify-between items-start z-10">
                  <Crown className="w-10 h-10 text-brand-rose-gold" />
                  <div className="w-3 h-3 rounded-full bg-brand-accent-pink animate-ping" />
                </div>

                {/* Inner visual typographic design representing luxury salon atmosphere */}
                <div className="my-auto text-center z-10 space-y-4">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-accent-pink block font-bold">
                    Est. 2018
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text tracking-wide">
                    Ideal Look
                  </h3>
                  <div className="h-[1px] w-24 bg-brand-rose-gold mx-auto" />
                  <p className="font-serif text-sm italic text-brand-rose-gold tracking-widest uppercase">
                    Ladies Beauty Studio
                  </p>
                </div>

                {/* Key Benefits Floating Badges at the bottom inside the frame */}
                <div className="flex justify-between items-end z-10 text-[10px] uppercase tracking-wider font-semibold text-brand-muted">
                  <span>Latifabad Unit 7</span>
                  <span>Premium Care</span>
                </div>

              </div>

              {/* Floating Decorative Badges outside the frame */}
              <div className="absolute -top-6 -right-4 bg-white border border-brand-border py-2 px-4 rounded-2xl shadow-md z-20 flex items-center space-x-2">
                <Award className="w-5 h-5 text-brand-rose-gold" />
                <div>
                  <span className="text-xs font-bold block text-brand-text">Bridal Studio</span>
                  <span className="text-[10px] text-brand-muted block">Elite Artistry</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 bg-white border border-brand-border py-2.5 px-4 rounded-2xl shadow-md z-20 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div>
                  <span className="text-xs font-bold block text-brand-text">100% Hygienic</span>
                  <span className="text-[10px] text-brand-muted block">Sanitized Kits</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* HERO STATISTICS BANNER */}
      <section className="bg-brand-bg-secondary/60 border-y border-brand-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-brand-accent-pink">20+</span>
              <span className="block text-xs uppercase tracking-wider font-semibold text-brand-text">Verified Reviews</span>
              <span className="block text-[11px] text-brand-muted">4.1★ on Google Maps</span>
            </div>

            <div className="space-y-1 border-l border-brand-border/80">
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-brand-rose-gold">Elite</span>
              <span className="block text-xs uppercase tracking-wider font-semibold text-brand-text">Bridal Studio</span>
              <span className="block text-[11px] text-brand-muted">Premium HD Draping</span>
            </div>

            <div className="space-y-1 border-l border-brand-border/80">
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-brand-accent-pink">Luxury</span>
              <span className="block text-xs uppercase tracking-wider font-semibold text-brand-text">Treatments</span>
              <span className="block text-[11px] text-brand-muted">Imported Safe Brands</span>
            </div>

            <div className="space-y-1 border-l border-brand-border/80">
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-brand-rose-gold">Trusted</span>
              <span className="block text-xs uppercase tracking-wider font-semibold text-brand-text">Beauty Experts</span>
              <span className="block text-[11px] text-brand-muted">Highly Trained Staff</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Graphic Grid (Instead of photos, we build a beautiful high-end list of typographic feature boards) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-full bg-brand-bg-secondary flex items-center justify-center">
                  <Crown className="w-5 h-5 text-brand-rose-gold" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-brand-text">Bespoke Bridal</h4>
                <p className="text-xs text-brand-muted leading-relaxed font-light">
                  Tailored styling, jewelry setups, and custom makeup trials designed for your dream wedding glow.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4 translate-y-6">
                <div className="w-10 h-10 rounded-full bg-brand-bg-secondary flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-brand-accent-pink" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-brand-text">Hair Couture</h4>
                <p className="text-xs text-brand-muted leading-relaxed font-light">
                  From nourishing Keratin smoothing to elegant modern updos, we rejuvenate your hair.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-full bg-brand-bg-secondary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-rose-gold" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-brand-text">Derm Skincare</h4>
                <p className="text-xs text-brand-muted leading-relaxed font-light">
                  Hydra-facials and botanical treatments using premium products to treat and refresh.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4 translate-y-6">
                <div className="w-10 h-10 rounded-full bg-brand-bg-secondary flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-accent-pink" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-brand-text">Hygienic Care</h4>
                <p className="text-xs text-brand-muted leading-relaxed font-light">
                  Strict standards, fresh single-use supplies, and sanitization for your peace of mind.
                </p>
              </div>

            </div>

            {/* Right Text Content Side */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-rose-gold block">
                  Welcome to Ideal Look Salon
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text">
                  Crafting Timeless Beauty in Hyderabad
                </h2>
                <div className="h-[2px] w-20 bg-brand-accent-pink" />
              </div>

              <p className="text-brand-muted leading-relaxed text-base font-light">
                Nestled in the prime area of <strong>Unit 7 House, Latifabad, Hyderabad</strong>, Ideal Look Salon stands as the pinnacle of elegant feminine pampering. We have crafted a beautiful, tranquil sanctuary where luxury meets professional beauty expertise.
              </p>

              <p className="text-brand-muted leading-relaxed text-base font-light">
                Our philosophy is simple: we believe every client has a unique signature beauty that deserves to be meticulously highlighted. Whether you are walking down the aisle, attending a luxury soirée, or treating yourself to hair restoration and advanced skincare, our master beauticians ensure a premium and comfortable experience.
              </p>

              {/* Three Pillars highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-brand-accent-pink font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Premium Only</span>
                  </div>
                  <p className="text-[11px] text-brand-muted font-light pl-6">
                    We strictly use imported, dermatologist-approved cosmetics.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-brand-rose-gold font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Elite Team</span>
                  </div>
                  <p className="text-[11px] text-brand-muted font-light pl-6">
                    Our staff is professionally trained in modern bridal and skin sciences.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-brand-accent-pink font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Absolute Privacy</span>
                  </div>
                  <p className="text-[11px] text-brand-muted font-light pl-6">
                    Fully private ladies-only sections to ensure comfort.
                  </p>
                </div>

              </div>

              {/* Action */}
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection('services')}
                  className="inline-flex items-center space-x-2 text-brand-accent-pink font-semibold text-sm group"
                >
                  <span>Explore our treatment catalog</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. PREMIUM SERVICES SECTION */}
      <section id="services" className="py-20 md:py-32 bg-brand-bg-secondary/40 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-rose-gold block">
              Our Curated Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text">
              Premium Beauty & Hair Treatments
            </h2>
            <p className="text-brand-muted text-sm font-light">
              Explore our comprehensive range of luxury services. Click "Add to Booking Builder" to craft a personalized package and generate a direct WhatsApp request!
            </p>
            <div className="h-[2px] w-20 bg-brand-accent-pink mx-auto" />
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {['All', 'Bridal', 'Makeup', 'Hair', 'Skincare', 'Body Care'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-brand-accent-pink text-white shadow-md'
                    : 'bg-white border border-brand-border text-brand-text hover:bg-brand-bg-secondary hover:border-brand-accent-pink/30'
                }`}
              >
                {category === 'All' ? 'All Treatments' : category}
              </button>
            ))}
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const isSelected = booking.selectedServiceIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 ${
                    isSelected ? 'border-brand-accent-pink ring-2 ring-brand-accent-pink/10' : 'border-brand-border'
                  }`}
                >
                  
                  {/* Card Header Info */}
                  <div className="p-6 sm:p-8 space-y-4">
                    
                    {/* Badge & Popular indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-rose-gold bg-brand-bg-primary border border-brand-border/80 px-2.5 py-1 rounded-full">
                        {service.category}
                      </span>
                      {service.popular && (
                        <span className="inline-flex items-center space-x-1 text-[10px] uppercase tracking-wider font-bold text-brand-accent-pink bg-brand-accent-pink/10 px-2.5 py-1 rounded-full border border-brand-accent-pink/20">
                          <Sparkles className="w-3 h-3 text-brand-accent-pink" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl font-semibold text-brand-text">
                        {service.name}
                      </h3>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-brand-accent-pink font-semibold text-sm">
                          {service.priceText}
                        </span>
                        {service.duration && (
                          <span className="text-[11px] text-brand-muted font-light">
                            ({service.duration})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-brand-muted leading-relaxed font-light">
                      {service.description}
                    </p>

                  </div>

                  {/* Card Interactive Footer Action */}
                  <div className="px-6 pb-6 pt-2 bg-brand-bg-primary/40 border-t border-brand-border/40 flex items-center justify-between">
                    <span className="text-[11px] text-brand-muted font-medium">
                      {isSelected ? '✓ Added to Custom Booking' : 'Not added yet'}
                    </span>
                    <button
                      onClick={() => toggleServiceInBooking(service.id)}
                      className={`text-[11px] font-semibold tracking-wider uppercase py-2 px-4 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-brand-accent-pink text-white hover:bg-[#d6557e]'
                          : 'bg-white border border-brand-rose-gold text-brand-rose-gold hover:bg-brand-rose-gold hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Remove' : 'Add to Book'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Quick Consultation Callout */}
          <div className="mt-16 bg-white border border-brand-border rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-serif text-xl font-semibold text-brand-text">Need a bespoke treatment plan?</h3>
            <p className="text-xs text-brand-muted max-w-xl mx-auto leading-relaxed">
              Our experts can customize facials, hair treatments, and makeup combinations specifically for your skin, hair type, and occasions. Talk directly to our salon manager.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/923146867612?text=Hello%20Ideal%20Look%20Salon%2C%20I%20would%20like%20to%20get%20a%20free%20consultation%20for%20my%20hair/skin."
                target="_blank"
                rel="referrer noopener"
                className="inline-flex items-center space-x-2 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-full hover:shadow-md transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BRIDAL EXPERIENCE SECTION */}
      <section id="bridal" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white via-brand-bg-secondary/40 to-brand-bg-secondary border border-brand-border rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm">
            
            {/* Elegant Background Monogram Vector Pattern */}
            <div className="absolute right-0 bottom-0 w-80 h-80 opacity-10 pointer-events-none">
              <svg className="w-full h-full text-brand-rose-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="45" strokeWidth="0.5" />
                <path d="M10 50 L90 50 M50 10 L50 90" strokeWidth="0.5" />
                <polygon points="50,10 90,50 50,90 10,50" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Editorial Typography Text */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center space-x-2 bg-white border border-brand-border py-1 px-3 rounded-full">
                  <Crown className="w-3.5 h-3.5 text-brand-rose-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-rose-gold">
                    Signature Bridal Studio
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-brand-text">
                  A Haven for the <br />
                  <span className="font-semibold italic text-brand-rose-gold">Modern Bride</span>
                </h2>

                <p className="text-brand-muted text-sm sm:text-base leading-relaxed font-light">
                  Your wedding day is a celebration of love, history, and new beginnings. At Ideal Look Bridal Studio, we transform your bridal vision into absolute reality. Under the direction of our certified master artist, we craft a luminous, long-lasting look that radiates on camera and captivates in person.
                </p>

                {/* Bridal checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-accent-pink/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-accent-pink" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block text-brand-text">Custom Bridal Mood-Board</span>
                      <p className="text-[11px] text-brand-muted">Tailored shade matching and skin prep planning during consultation.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-accent-pink/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-accent-pink" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block text-brand-text">HD & Airbrush Foundations</span>
                      <p className="text-[11px] text-brand-muted">Flawless, lightweight coverage engineered for sweat resistance.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-accent-pink/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-accent-pink" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block text-brand-text">Dupatta & Jewelry Draping</span>
                      <p className="text-[11px] text-brand-muted">Perfect secure pins and elegant setting of traditional jewelry.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-accent-pink/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-accent-pink" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold block text-brand-text">Exclusive Bridal Lounge</span>
                      <p className="text-[11px] text-brand-muted">A beautiful, calm, private space for the bride and her bridal party.</p>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => {
                      setBooking(prev => ({
                        ...prev,
                        selectedServiceIds: ['bridal-signature', ...prev.selectedServiceIds.filter(id => id !== 'bridal-signature')]
                      }));
                      scrollToSection('booking-builder');
                    }}
                    className="w-full sm:w-auto text-center bg-brand-accent-pink text-white text-xs uppercase tracking-wider font-semibold py-3.5 px-8 rounded-full shadow-md hover:bg-[#d6557e] transition"
                  >
                    Select Signature Bridal Bundle
                  </button>
                  <a
                    href="https://wa.me/923146867612?text=Hello%20Ideal%20Look%20Salon%2C%20I%20would%20like%20to%20inquire%20about%20your%20bridal%20makeup%20packages%20and%20rates."
                    target="_blank"
                    rel="referrer noopener"
                    className="w-full sm:w-auto text-center border border-brand-rose-gold text-brand-rose-gold text-xs uppercase tracking-wider font-semibold py-3.5 px-8 rounded-full hover:bg-brand-rose-gold hover:text-white transition"
                  >
                    Consult Bridal Coordinator
                  </a>
                </div>

              </div>

              {/* Right Side: Elegant Graphic Visual representation of Bridal Packages */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 w-full max-w-sm shadow-sm space-y-6 relative">
                  
                  {/* Luxury Star Accents */}
                  <div className="absolute -top-3 -left-3 text-brand-rose-gold animate-bounce">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <div className="text-center space-y-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent-pink block">Featured Package</span>
                    <h3 className="font-serif text-2xl font-semibold text-brand-text">The Royal Bride</h3>
                    <div className="h-[1px] w-12 bg-brand-rose-gold mx-auto" />
                  </div>

                  <div className="space-y-3">
                    {[
                      'Pre-Bridal Complete Glow Facial',
                      'Ultra-HD Signature Bridal Makeup',
                      'Exquisite Bridal Hair Styling',
                      'Professional Jewelry & Dupatta Setting',
                      'Lash Customization & Gel Mani-Pedi',
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-brand-muted">
                        <Check className="w-4 h-4 text-brand-rose-gold flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-brand-border/60 pt-4 text-center">
                    <span className="text-brand-muted text-[10px] uppercase tracking-wider block">Comprehensive Luxury Care</span>
                    <span className="font-serif text-lg font-bold text-brand-rose-gold">Exquisite Glow Guaranteed</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section id="why-us" className="py-20 md:py-32 bg-brand-bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-rose-gold block">
              The Standard of Perfection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text">
              Why Discerning Women Choose Us
            </h2>
            <p className="text-brand-muted text-sm font-light">
              We focus on the minute details of hospitality, science-driven skin treatments, and elegant styles to ensure you receive a truly elite salon session.
            </p>
            <div className="h-[2px] w-20 bg-brand-accent-pink mx-auto" />
          </div>

          {/* Bento Grid Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Box 1 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm space-y-4 hover:border-brand-accent-pink/30 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-bg-primary border border-brand-border flex items-center justify-center">
                <Crown className="w-6 h-6 text-brand-rose-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-text">Imported Elite Brands</h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                We strictly utilize globally recognized, authentic skincare and cosmetic formulas. Absolutely no cheap or chemical-heavy substitutes are tolerated.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm space-y-4 hover:border-brand-accent-pink/30 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-bg-primary border border-brand-border flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-brand-accent-pink" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-text">Artistry & Technique</h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Our team is constantly educated on advanced beauty trends, contouring mathematics, and state-of-the-art hair protein therapies.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm space-y-4 hover:border-brand-accent-pink/30 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-bg-primary border border-brand-border flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-text">Hospital Grade Hygiene</h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Complete tools sterilization between clients, single-use application sponges, and fresh towels are strict non-negotiables.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-sm space-y-4 hover:border-brand-accent-pink/30 hover:shadow-md transition duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-bg-primary border border-brand-border flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-brand-rose-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-brand-text">Tranquil Ladies Suite</h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Our interiors are sound-softened, filled with relaxing therapeutic aromas, and 100% private to ensure your deep relaxation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Aggregated rating presentation */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              
              <span className="text-xs uppercase tracking-widest font-bold text-brand-accent-pink block">
                Loved By Hundreds
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text">
                Real Reviews From Verified Clients
              </h2>
              <p className="text-brand-muted text-sm font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                With a stellar 4.1-star rating on Google Maps based on dozens of reviews, Ideal Look Salon is a certified favorite for women in Latifabad and across Hyderabad.
              </p>

              {/* Aggregated Score block */}
              <div className="bg-white border border-brand-border rounded-2xl p-6 inline-block max-w-sm mx-auto shadow-sm">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="font-serif text-5xl font-bold text-brand-rose-gold">4.1</span>
                  <div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-brand-muted block font-medium mt-1">Google Maps Score</span>
                  </div>
                </div>
                <div className="border-t border-brand-border/60 mt-4 pt-3 text-[11px] text-brand-muted font-medium">
                  ★ 20+ Verified Client Reviews and Counting
                </div>
              </div>

            </div>

            {/* Right Column: Sliding Testimonials */}
            <div className="lg:col-span-7 relative">
              <div className="bg-brand-bg-secondary/40 border border-brand-border rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                
                {/* Visual quote indicator */}
                <span className="absolute top-2 right-4 font-serif text-[120px] text-brand-border/40 select-none pointer-events-none font-bold leading-none">
                  “
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    
                    {/* Stars of review */}
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="font-serif text-base sm:text-lg italic text-brand-text leading-relaxed font-light">
                      "{TESTIMONIALS[currentTestimonialIndex].text}"
                    </p>

                    {/* Review Author & Verification */}
                    <div className="flex items-center justify-between pt-4 border-t border-brand-border/60">
                      <div>
                        <span className="font-serif text-sm font-semibold text-brand-text block">
                          {TESTIMONIALS[currentTestimonialIndex].name}
                        </span>
                        <span className="text-[11px] text-brand-muted block font-light">
                          Verified Customer • {TESTIMONIALS[currentTestimonialIndex].date}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                        Verified Google Review
                      </span>
                    </div>

                  </motion.div>
                </AnimatePresence>

                {/* Slider controls */}
                <div className="flex items-center space-x-2 mt-8">
                  <button
                    onClick={() => setCurrentTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center hover:bg-brand-bg-secondary transition"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                    className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center hover:bg-brand-bg-secondary transition"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="flex space-x-1.5 ml-4">
                    {TESTIMONIALS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentTestimonialIndex === i ? 'w-6 bg-brand-accent-pink' : 'w-2 bg-brand-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE APPOINTMENT BOOKING BUILDER (CONVERSION CTA) */}
      <section id="booking-builder" className="py-20 md:py-32 bg-brand-bg-secondary/40 border-y border-brand-border/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-rose-gold block">
              Conversion Appointment Engine
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text">
              Bespoke Beauty Package Planner
            </h2>
            <p className="text-brand-muted text-sm font-light">
              Toggle treatments below, choose your desired date/time, and compile a tailored booking ticket. Clicking "Send WhatsApp" will prepare your custom WhatsApp message instantly!
            </p>
            <div className="h-[2px] w-20 bg-brand-accent-pink mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Quick checklist selectors organized by categories */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-6">
              
              <h3 className="font-serif text-xl font-semibold text-brand-text pb-3 border-b border-brand-border">
                1. Select Desired Treatments
              </h3>

              {/* Grouped selectors */}
              <div className="space-y-6">
                
                {['Bridal', 'Makeup', 'Hair', 'Skincare', 'Body Care'].map((cat) => {
                  const catServices = SERVICES.filter(s => s.category === cat);
                  return (
                    <div key={cat} className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-brand-rose-gold">
                        {cat === 'Bridal' ? 'Bridal Studio Specialties' : `${cat} Treatments`}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {catServices.map(service => {
                          const isSelected = booking.selectedServiceIds.includes(service.id);
                          return (
                            <button
                              key={service.id}
                              onClick={() => toggleServiceInBooking(service.id)}
                              className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all duration-300 ${
                                isSelected
                                  ? 'bg-brand-bg-secondary border-brand-accent-pink shadow-sm'
                                  : 'bg-white border-brand-border hover:border-brand-accent-pink/30'
                              }`}
                            >
                              <div className="space-y-1 pr-2">
                                <span className="text-xs font-semibold block text-brand-text leading-tight">
                                  {service.name}
                                </span>
                                <span className="text-[10px] text-brand-muted block font-light">
                                  {service.priceText}
                                </span>
                              </div>
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border transition-all ${
                                isSelected
                                  ? 'bg-brand-accent-pink border-brand-accent-pink text-white'
                                  : 'border-brand-border bg-white'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

              </div>

            </div>

            {/* Right: Consolidated Summary Ticket & Time Form */}
            <div className="lg:col-span-5 space-y-8 sticky top-24">
              <div className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-md relative overflow-hidden">
                
                {/* Visual Gold Ticket Notch accent */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-full bg-brand-bg-primary border-r border-brand-border" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 rounded-full bg-brand-bg-primary border-l border-brand-border" />

                <div className="text-center pb-4 border-b border-dashed border-brand-border/80 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent-pink">Your Booking Ticket</span>
                  <h3 className="font-serif text-2xl font-semibold text-brand-text">Ideal Look Salon</h3>
                  <p className="text-[10px] text-brand-muted">Latifabad Unit 7, Hyderabad, PK</p>
                </div>

                {/* Form fields */}
                <form onSubmit={handleRequestCallback} className="py-6 space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="date-input" className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                        Preferred Date
                      </label>
                      <input
                        id="date-input"
                        type="date"
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                        className="w-full text-xs border border-brand-border rounded-lg p-2.5 focus:outline-none focus:border-brand-accent-pink"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="time-input" className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                        Preferred Time
                      </label>
                      <input
                        id="time-input"
                        type="time"
                        value={booking.time}
                        onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                        className="w-full text-xs border border-brand-border rounded-lg p-2.5 focus:outline-none focus:border-brand-accent-pink"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                      Your Full Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="e.g. Sobia Khan"
                      value={booking.name}
                      onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                      className="w-full text-xs border border-brand-border rounded-lg p-2.5 focus:outline-none focus:border-brand-accent-pink"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="notes-input" className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                      Special Requests / Skin Type Notes
                    </label>
                    <textarea
                      id="notes-input"
                      rows={2}
                      placeholder="e.g. sensitive skin, need draping for dark green dupatta..."
                      value={booking.notes}
                      onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                      className="w-full text-xs border border-brand-border rounded-lg p-2.5 focus:outline-none focus:border-brand-accent-pink resize-none"
                    />
                  </div>

                  {/* Summary lists */}
                  <div className="space-y-2.5 pt-4 border-t border-brand-border/60">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-muted block">
                      Selected Treatments ({selectedServicesList.length})
                    </span>
                    
                    {selectedServicesList.length === 0 ? (
                      <div className="text-center py-4 text-xs text-brand-muted bg-brand-bg-primary/50 border border-brand-border rounded-xl">
                        No treatments selected. Please tap items on the left to add them to your luxury session ticket.
                      </div>
                    ) : (
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 divide-y divide-brand-border/40">
                        {selectedServicesList.map(s => (
                          <div key={s.id} className="flex justify-between items-center text-xs pt-1.5">
                            <span className="font-semibold text-brand-text">{s.name}</span>
                            <span className="text-brand-accent-pink font-medium">{s.priceText}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Direct CTA */}
                  <div className="pt-4 space-y-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="referrer noopener"
                      className="w-full inline-flex items-center justify-center space-x-2 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-300 text-center cursor-pointer"
                    >
                      <MessageCircle className="w-4.5 h-4.5" />
                      <span>Send Direct Booking to WhatsApp</span>
                    </a>

                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-[1px] bg-brand-border/80 flex-grow" />
                      <span className="text-[10px] uppercase tracking-wider text-brand-muted">Or Callback</span>
                      <div className="h-[1px] bg-brand-border/80 flex-grow" />
                    </div>

                    <button
                      type="submit"
                      disabled={!booking.name}
                      className="w-full border border-brand-rose-gold text-brand-rose-gold text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-full hover:bg-brand-rose-gold hover:text-white transition duration-300 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Request Consultation Callback
                    </button>
                  </div>

                </form>

                {/* Toast feedback on callback */}
                <AnimatePresence>
                  {callbackSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6 space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif text-xl font-bold text-brand-text">Callback Requested!</h4>
                      <p className="text-xs text-brand-muted max-w-xs leading-relaxed">
                        Thank you, <strong>{booking.name}</strong>. Our bridal and salon coordinator will contact you shortly on <strong>+92 314 6867612</strong> to plan your schedule.
                      </p>
                      <button
                        onClick={() => setCallbackSuccess(false)}
                        className="text-xs font-semibold text-brand-accent-pink hover:underline pt-2"
                      >
                        Back to Ticket Editor
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. CONTACT SECTION & MAP */}
      <section id="contact" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Contact Cards */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-rose-gold block">
                  Find Our Beauty Sanctuary
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-text">
                  Contact Ideal Look Salon
                </h2>
                <p className="text-brand-muted text-sm font-light">
                  We are conveniently situated in the upscale residential and commercial sector of Latifabad, Hyderabad. Drop by or call us anytime.
                </p>
                <div className="h-[2px] w-20 bg-brand-accent-pink" />
              </div>

              {/* Cards details list */}
              <div className="space-y-6">
                
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-full bg-brand-bg-secondary border border-brand-border flex items-center justify-center text-brand-rose-gold flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-brand-text">Our Address</h4>
                    <p className="text-xs text-brand-muted leading-relaxed font-light mt-1">
                      Unit 7 House, Latifabad Unit 7, Hyderabad, 71000, Pakistan
                    </p>
                    <a
                      href="https://maps.google.com/?q=Unit+7+House,+Latifabad+Unit+7,+Hyderabad,+Pakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-brand-accent-pink hover:underline inline-flex items-center space-x-1 mt-2"
                    >
                      <span>Open on Google Maps</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-full bg-brand-bg-secondary border border-brand-border flex items-center justify-center text-brand-accent-pink flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-brand-text">Phone & WhatsApp Support</h4>
                    <p className="text-xs text-brand-muted font-light mt-1">
                      Direct Bookings & Inquiries
                    </p>
                    <a
                      href="tel:+923146867612"
                      className="text-xs font-semibold text-brand-text hover:text-brand-accent-pink block mt-1.5"
                    >
                      +92 314 6867612
                    </a>
                    <a
                      href="https://wa.me/923146867612?text=Hello%20Ideal%20Look%20Salon%2C%20I%20would%20like%20to%20ask%20a%20question."
                      target="_blank"
                      rel="referrer noopener"
                      className="text-[11px] font-semibold text-emerald-600 hover:underline inline-flex items-center space-x-1 mt-1"
                    >
                      <span>Chat on WhatsApp</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-full bg-brand-bg-secondary border border-brand-border flex items-center justify-center text-brand-rose-gold flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-brand-text">Operating Hours</h4>
                    <div className="text-xs text-brand-muted space-y-1 font-light mt-1.5">
                      <div className="flex justify-between w-48">
                        <span>Tuesday – Sunday:</span>
                        <span className="font-medium text-brand-text">11:00 AM – 8:00 PM</span>
                      </div>
                      <div className="flex justify-between w-48">
                        <span>Monday:</span>
                        <span className="font-medium text-brand-accent-pink">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right side: Abstract Stylized Interactive Map Card (No external image files) */}
            <div className="lg:col-span-7">
              <div className="bg-brand-bg-secondary/40 border-2 border-brand-border/60 rounded-3xl p-6 sm:p-8 relative shadow-sm h-96 flex flex-col justify-between overflow-hidden">
                
                {/* Simulated geographic map grid made entirely of pure styled lines & animations */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full text-brand-rose-gold/60" viewBox="0 0 200 100" fill="none" stroke="currentColor">
                    {/* Road grids */}
                    <path d="M0,20 Q100,20 200,80" strokeWidth="2" />
                    <path d="M10,0 Q60,90 200,30" strokeWidth="1.5" />
                    <path d="M80,0 V100" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M150,0 V100" strokeWidth="1" />
                    <path d="M0,70 H200" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Indus river representation nearby */}
                    <path d="M0,90 Q50,60 110,80 T200,95" strokeWidth="4" stroke="currentColor" className="opacity-30" />
                  </svg>
                </div>

                {/* Top instructions label inside map */}
                <div className="z-10 bg-white/95 backdrop-blur-sm border border-brand-border py-2 px-4 rounded-xl shadow-sm self-start flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-brand-rose-gold animate-spin" style={{ animationDuration: '10s' }} />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-text">Latifabad Unit 7, Hyderabad</span>
                </div>

                {/* Exact Location marker floating center-right representing Unit 7 House */}
                <div className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  
                  {/* Glowing radiating circles */}
                  <div className="absolute w-12 h-12 bg-brand-accent-pink/25 rounded-full animate-ping pointer-events-none" />
                  <div className="absolute w-6 h-6 bg-brand-accent-pink/40 rounded-full animate-pulse pointer-events-none" />
                  
                  {/* Pin button */}
                  <div className="w-10 h-10 rounded-full bg-brand-accent-pink border-2 border-white flex items-center justify-center shadow-lg text-white z-10 cursor-pointer hover:scale-110 transition">
                    <MapPin className="w-5 h-5 fill-current" />
                  </div>

                  {/* Bubble popup */}
                  <div className="bg-white border border-brand-border px-3 py-1.5 rounded-lg shadow-md mt-2 z-10 text-center w-36">
                    <span className="text-[10px] font-bold block text-brand-text">Ideal Look Salon</span>
                    <span className="text-[8px] text-brand-muted block">Unit 7 House</span>
                  </div>

                </div>

                {/* Floating Navigation Prompt bottom-left inside map */}
                <div className="z-10 bg-white/95 backdrop-blur-sm border border-brand-border p-4 rounded-xl shadow-sm self-start max-w-xs space-y-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-brand-rose-gold block">Pre-Filled Route Planner</span>
                  <p className="text-[10px] text-brand-muted leading-relaxed">
                    We are next to Latifabad Unit 7 landmarks, offering secure on-site parking for our beauty salon clients.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Unit+7+House,+Latifabad+Unit+7,+Hyderabad,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[10px] font-bold text-brand-accent-pink hover:underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. FOOTER SECTION */}
      <footer className="bg-[#1C1C1C] text-white pt-16 pb-12 border-t-2 border-brand-rose-gold/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            
            {/* Logo, Description */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border border-brand-rose-gold bg-[#2A2A2A] flex items-center justify-center">
                  <span className="font-serif text-base font-bold text-brand-rose-gold tracking-widest">IL</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-semibold tracking-wide block text-white">
                    Ideal Look
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-brand-accent-pink block font-semibold">
                    Salon & Bridal Studio
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed font-light">
                Hyderabad's premium ladies-only salon and bridal haven. Combining elite international cosmetic formulas with certified expertise to reveal your ultimate signature elegance.
              </p>

              {/* Social links */}
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-accent-pink/50 transition"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-accent-pink/50 transition"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/923146867612"
                  target="_blank"
                  rel="referrer noopener"
                  className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/50 transition"
                  aria-label="Contact us on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Treatment Categories navigation links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif text-sm font-semibold text-brand-rose-gold uppercase tracking-wider">
                Services & Care
              </h4>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li><button onClick={() => { setActiveCategory('Bridal'); scrollToSection('services'); }} className="hover:text-white transition">Signature Bridal Glow</button></li>
                <li><button onClick={() => { setActiveCategory('Makeup'); scrollToSection('services'); }} className="hover:text-white transition">Party Glamour Makeup</button></li>
                <li><button onClick={() => { setActiveCategory('Hair'); scrollToSection('services'); }} className="hover:text-white transition">Keratin Protein Therapy</button></li>
                <li><button onClick={() => { setActiveCategory('Skincare'); scrollToSection('services'); }} className="hover:text-white transition">Hydra-Glow Advanced Facial</button></li>
                <li><button onClick={() => { setActiveCategory('Body Care'); scrollToSection('services'); }} className="hover:text-white transition">Hygienic Organic Waxing</button></li>
                <li><button onClick={() => { setActiveCategory('Body Care'); scrollToSection('services'); }} className="hover:text-white transition">Royal Spa Pedicure & Manicure</button></li>
              </ul>
            </div>

            {/* Quick sections navigation links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-sm font-semibold text-brand-rose-gold uppercase tracking-wider">
                Sanctuary Info
              </h4>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">Our Philosophy</button></li>
                <li><button onClick={() => scrollToSection('why-us')} className="hover:text-white transition">Hygiene Protocol</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition">Client Testimonials</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition">Sanctuary Address</button></li>
                <li><button onClick={() => scrollToSection('booking-builder')} className="hover:text-white transition">Booking Builder</button></li>
              </ul>
            </div>

            {/* Trust Reviews */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-serif text-sm font-semibold text-brand-rose-gold uppercase tracking-wider">
                Client Trust Check
              </h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                We are proud to serve families, bridal parties, and beauty enthusiasts in Hyderabad with a pristine 4.1 Stars verified rating.
              </p>
              <div className="p-4 rounded-xl bg-[#2A2A2A] border border-white/5 space-y-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-gray-300 block font-semibold">
                  Google Maps • 20+ Verified Reviews
                </span>
              </div>
            </div>

          </div>

          {/* Copyright, disclaimer and credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-light">
            <span>
              &copy; {new Date().getFullYear()} Ideal Look Salon & Bridal Studio. All Rights Reserved.
            </span>
            <span>
              Unit 7 House, Latifabad Unit 7, Hyderabad, Pakistan
            </span>
            <span className="text-gray-600">
              Premium Ladies Beauty Haven • Conversion Focused
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
