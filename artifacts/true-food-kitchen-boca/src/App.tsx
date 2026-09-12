import { type ReactNode, useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Clock3,
  ExternalLink,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import bocaImage from '@assets/true-food/boca-raton.webp';
import grainImage from '@assets/true-food/ancient-grain.jpg.webp';
import pizzaImage from '@assets/true-food/pizza-category.webp';
import entreeImage from '@assets/true-food/entree-category.webp';
import matchaImage from '@assets/true-food/matcha-latte.jpg';
import brunchImage from '@assets/true-food/brunch.jpg';

const queryClient = new QueryClient();

const RESERVATION_URL = 'https://www.opentable.com/r/true-food-kitchen-boca-raton';
const ORDER_URL = 'https://www.truefoodkitchen.com/order-online';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=True+Food+Kitchen+Boca+Raton+6000+Glades+Rd';

type Category = 'All' | 'Bowls' | 'Mains' | 'Pizza' | 'Brunch';

const menuItems = [
  { name: 'Ancient Grain Bowl', category: 'Bowls' as Category, description: 'Roasted sweet potato, charred onion, mushrooms, snap peas, avocado, hemp seed', note: 'Plant-based', price: '$17.50' },
  { name: 'Korean Noodle Bowl', category: 'Bowls' as Category, description: 'Sweet potato glass noodles, vegetables, gochujang, toasted sesame', note: 'Vegan-friendly', price: '$18.25' },
  { name: 'Grass-Fed Burger', category: 'Mains' as Category, description: 'Organic tomato, organic greens, red onion, garlic aioli, house-made bun', note: 'Guest favorite', price: '$19.50' },
  { name: 'Spaghetti Squash Casserole', category: 'Mains' as Category, description: 'Roasted spaghetti squash, house-made turkey meatballs, tomato sauce, parmesan', note: 'Gluten-friendly', price: '$18.75' },
  { name: 'Margherita Pizza', category: 'Pizza' as Category, description: 'Tomato, fresh mozzarella, basil, extra virgin olive oil', note: 'Vegetarian', price: '$16.50' },
  { name: 'Brunch Pancakes', category: 'Brunch' as Category, description: 'Seasonal berries, maple syrup, whipped ricotta, toasted pecans', note: 'Weekend brunch', price: '$14.75' },
];

function ActionLink({ href, children, dark = false, testId }: { href: string; children: ReactNode; dark?: boolean; testId: string }) {
  return (
    <a
      href={href}
      data-testid={testId}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`tfk-action inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-[.72rem] font-bold uppercase tracking-[.14em] transition-transform duration-200 hover:-translate-y-0.5 ${dark ? 'bg-[#193c39] text-[#f4f0e7]' : 'bg-[#ed7b66] text-[#193c39]'}`}
    >
      {children}<ArrowRight className="tfk-arrow h-4 w-4" />
    </a>
  );
}

function Mark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" data-testid="link-brand-home" className={`flex items-center gap-3 ${light ? 'text-[#f4f0e7]' : 'text-[#193c39]'}`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${light ? 'border-[#f4f0e7]/60' : 'border-[#193c39]/50'}`}>TF</span>
      <span className="tfk-display text-[1.16rem] font-semibold leading-[.92]">True Food<br /><span className="text-[.72rem] tracking-[.04em]">Kitchen</span></span>
    </a>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<Category>('All');

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const visibleItems = category === 'All' ? menuItems : menuItems.filter((item) => item.category === category);

  return (
    <main id="top" className="tfk-page tfk-noise min-h-[100dvh]">
      <div className="bg-[#193c39] px-5 py-2 text-center text-[.62rem] font-semibold uppercase tracking-[.18em] text-[#f4f0e7]">
        <span>Now serving summer at Town Center</span><span className="mx-3 text-[#ed7b66]">•</span><span>Brunch Sat & Sun from 10am</span>
      </div>

      <header className="relative z-40 border-b border-[#193c39]/15 bg-[#f4f0e7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-10">
          <Mark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#our-menu" data-testid="link-nav-menu" className="tfk-link text-[.7rem] font-bold uppercase tracking-[.14em]">Our menu</a>
            <a href="#philosophy" data-testid="link-nav-story" className="tfk-link text-[.7rem] font-bold uppercase tracking-[.14em]">Our approach</a>
            <a href="#visit" data-testid="link-nav-visit" className="tfk-link text-[.7rem] font-bold uppercase tracking-[.14em]">Visit us</a>
            <a href="#gather" data-testid="link-nav-gather" className="tfk-link text-[.7rem] font-bold uppercase tracking-[.14em]">Gather</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={RESERVATION_URL} target="_blank" rel="noreferrer" data-testid="link-header-reservation" className="rounded-full border border-[#193c39]/35 px-4 py-2.5 text-[.66rem] font-bold uppercase tracking-[.14em] transition-colors hover:bg-[#193c39] hover:text-[#f4f0e7]">Reserve a table</a>
            <a href={ORDER_URL} target="_blank" rel="noreferrer" data-testid="link-header-order" className="rounded-full bg-[#ed7b66] px-4 py-2.5 text-[.66rem] font-bold uppercase tracking-[.14em] transition-transform hover:-translate-y-0.5">Order online</a>
          </div>
          <button type="button" data-testid="button-open-mobile-menu" aria-label="Open menu" className="rounded-full border border-[#193c39]/30 p-2.5 md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col bg-[#193c39] px-6 py-5 text-[#f4f0e7] md:hidden">
            <div className="flex items-center justify-between"><Mark light /><button type="button" data-testid="button-close-mobile-menu" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X className="h-7 w-7" /></button></div>
            <nav className="mt-20 flex flex-col gap-7" aria-label="Mobile navigation">
              {[['#our-menu', 'Our menu'], ['#philosophy', 'Our approach'], ['#visit', 'Visit us'], ['#gather', 'Gather']].map(([href, label]) => (
                <a key={href} href={href} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMobileOpen(false)} className="tfk-display text-5xl">{label}</a>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 pb-5"><ActionLink href={RESERVATION_URL} dark testId="link-mobile-reservation">Reserve a table</ActionLink><ActionLink href={ORDER_URL} testId="link-mobile-order">Order online</ActionLink></div>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-[1400px] items-stretch lg:grid-cols-[.88fr_1.12fr]" aria-labelledby="hero-title">
        <div className="flex flex-col justify-between px-5 pb-10 pt-14 sm:px-10 sm:pt-20 lg:px-16 lg:py-24">
          <div>
            <p className="tfk-eyebrow tfk-reveal text-[#e16f5e]">Boca Raton · Town Center</p>
            <h1 id="hero-title" className="tfk-display tfk-reveal tfk-reveal-2 mt-6 max-w-[680px] text-[clamp(3.7rem,7vw,7.5rem)] font-semibold leading-[.87]">Feel good<br /><em className="font-normal text-[#e16f5e]">food.</em></h1>
            <p className="tfk-reveal tfk-reveal-3 mt-8 max-w-[450px] text-lg leading-relaxed text-[#395b57]">Whole-food cooking with a little sunshine in every bite. Come for a bowl, stay for the patio, and leave feeling like yourself.</p>
            <div className="tfk-reveal tfk-reveal-4 mt-9 flex flex-wrap gap-3"><ActionLink href="#our-menu" testId="link-hero-menu">Explore the menu</ActionLink><a href={RESERVATION_URL} target="_blank" rel="noreferrer" data-testid="link-hero-reservation" className="inline-flex items-center gap-2 rounded-full border border-[#193c39]/30 px-5 py-3 text-[.72rem] font-bold uppercase tracking-[.14em] transition-colors hover:bg-[#193c39] hover:text-[#f4f0e7]">Reservations <ExternalLink className="h-3.5 w-3.5" /></a></div>
          </div>
          <div className="mt-14 flex items-end justify-between border-t border-[#193c39]/20 pt-5 lg:mt-20">
            <div><div className="flex items-center gap-1.5 text-[#e16f5e]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}</div><p className="mt-2 text-[.67rem] font-bold uppercase tracking-[.12em]">4.6 on Google · 2,568 reviews</p></div>
            <a href="#visit" data-testid="link-hero-hours" className="flex items-center gap-2 text-right text-[.67rem] font-bold uppercase tracking-[.1em]"><Clock3 className="h-4 w-4 text-[#e16f5e]" />Open today<br />until 9pm</a>
          </div>
        </div>
        <div className="tfk-image-wrap relative min-h-[480px] overflow-hidden lg:min-h-[700px]">
          <img src={bocaImage} alt="The colorful patio at True Food Kitchen Boca Raton" className="tfk-image absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-5 left-5 flex max-w-[220px] items-center gap-3 rounded-2xl bg-[#f4f0e7] px-4 py-3 sm:bottom-8 sm:left-8"><span className="tfk-dot" /><span className="text-xs font-semibold leading-snug">Plant-forward, not plant-only. Always seasonal.</span></div>
          <span className="absolute right-5 top-5 rotate-90 text-[.6rem] font-bold uppercase tracking-[.22em] text-[#f4f0e7] sm:right-8 sm:top-8">6000 Glades Road</span>
        </div>
      </section>

      <section className="border-y border-[#193c39]/15 bg-[#e9dfcf] px-5 py-8 sm:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-6 text-center sm:grid-cols-3 sm:divide-x sm:divide-[#193c39]/20">
          {[['01', 'Order your way', 'Dine in, takeout, delivery'], ['02', 'Open seven days', 'Brunch on weekends'], ['03', 'Room for a reason', 'Catering + private dining']].map(([number, title, copy]) => (
            <div key={number} className="flex items-center justify-center gap-4 sm:flex-col sm:gap-1"><span className="tfk-display text-2xl text-[#e16f5e]">{number}</span><div className="text-left sm:text-center"><h2 className="text-sm font-bold uppercase tracking-[.1em]">{title}</h2><p className="mt-1 text-sm text-[#54706b]">{copy}</p></div></div>
          ))}
        </div>
      </section>

      <section id="philosophy" className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-16 lg:py-36">
        <div className="relative"><div className="absolute -left-2 -top-9 text-[6rem] leading-none text-[#e16f5e]/45">“</div><p className="tfk-eyebrow text-[#e16f5e]">The True Food philosophy</p><h2 className="tfk-display mt-5 max-w-[530px] text-5xl font-semibold leading-[.93] sm:text-6xl">Good for you.<br /><span className="text-[#e16f5e]">Good for the planet.</span><br />Good for a Tuesday.</h2><a href="#our-menu" data-testid="link-story-menu" className="tfk-link mt-9 inline-flex items-center gap-3 text-[.7rem] font-bold uppercase tracking-[.15em]">See what’s in season <ArrowDownRight className="h-4 w-4" /></a></div>
        <div className="max-w-[570px] self-end text-[1.05rem] leading-[1.8] text-[#486660]"><p>Our menu starts with the food philosophy of Dr. Andrew Weil: meals made from whole, honest ingredients that help you feel your best. Our chefs follow the seasons, work with growers, and let bright produce do the talking.</p><p className="mt-6">That means plenty of plant-forward choices, thoughtful proteins, and the freedom to order exactly how you like. Vegan-friendly, gluten-friendly, and never preachy.</p><div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#193c39]/20 pt-5 text-[.68rem] font-bold uppercase tracking-[.13em] text-[#193c39] sm:grid-cols-4"><span>Whole foods</span><span>Seasonal</span><span>Mindful</span><span>Made here</span></div></div>
      </section>

      <section id="our-menu" className="bg-[#193c39] px-5 py-20 text-[#f4f0e7] sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="tfk-eyebrow text-[#ed7b66]">A menu with a point of view</p><h2 className="tfk-display mt-4 text-5xl font-semibold leading-[.9] sm:text-7xl">Come hungry.<br /><span className="text-[#ed7b66]">Leave bright.</span></h2></div><a href={ORDER_URL} target="_blank" rel="noreferrer" data-testid="link-menu-order" className="tfk-action inline-flex w-fit items-center gap-3 border-b border-[#ed7b66] pb-2 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#ed7b66]">Order pickup or delivery <ArrowRight className="tfk-arrow h-4 w-4" /></a></div>
          <div className="mt-12 flex flex-wrap gap-2 border-b border-[#f4f0e7]/20 pb-5">{(['All', 'Bowls', 'Mains', 'Pizza', 'Brunch'] as Category[]).map((item) => <button key={item} type="button" data-testid={`button-menu-filter-${item.toLowerCase()}`} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-[.68rem] font-bold uppercase tracking-[.12em] transition-colors ${category === item ? 'bg-[#ed7b66] text-[#193c39]' : 'border border-[#f4f0e7]/30 text-[#f4f0e7] hover:bg-[#f4f0e7]/10'}`}>{item}</button>)}</div>
          <div className="grid gap-x-12 md:grid-cols-2">{visibleItems.map((item) => <article key={item.name} data-testid={`card-menu-item-${item.name.toLowerCase().replaceAll(' ', '-')}`} className="tfk-menu-card grid grid-cols-[1fr_auto] gap-5 border-b border-[#f4f0e7]/20 py-6"><div><div className="flex items-baseline gap-3"><h3 className="tfk-display text-2xl font-medium">{item.name}</h3><span className="h-1.5 w-1.5 rounded-full bg-[#ed7b66]" /></div><p className="mt-2 max-w-[390px] text-sm leading-relaxed text-[#c4cfbd]">{item.description}</p><p className="mt-3 text-[.6rem] font-bold uppercase tracking-[.14em] text-[#ed7b66]">{item.note}</p></div><span className="text-sm font-semibold text-[#f5d89a]">{item.price}</span></article>)}</div>
          <div className="mt-8 flex items-center gap-2 text-[.65rem] uppercase tracking-[.12em] text-[#c4cfbd]"><Utensils className="h-4 w-4 text-[#ed7b66]" />Menus change with the seasons. Ask us about today’s specials.</div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><div className="tfk-image-wrap relative min-h-[450px] overflow-hidden bg-[#e9dfcf]"><img src={grainImage} alt="Ancient Grain Bowl with avocado and seasonal vegetables" className="tfk-image absolute inset-0 h-full w-full object-cover" /><div className="absolute left-5 top-5 rounded-full bg-[#f5d89a] px-4 py-2 text-[.62rem] font-bold uppercase tracking-[.13em]">A Boca favorite</div></div><div className="grid gap-5 sm:grid-cols-2"><div className="tfk-image-wrap relative min-h-[250px] overflow-hidden"><img src={pizzaImage} alt="Seasonal True Food Kitchen pizza" className="tfk-image absolute inset-0 h-full w-full object-cover" /></div><div className="tfk-image-wrap relative min-h-[250px] overflow-hidden"><img src={entreeImage} alt="Grass-fed steak entree with fries and greens" className="tfk-image absolute inset-0 h-full w-full object-cover" /></div><div className="flex flex-col justify-between bg-[#ed7b66] p-7 sm:col-span-2 sm:p-8"><div><p className="tfk-eyebrow text-[#193c39]">On the table</p><h2 className="tfk-display mt-4 text-4xl font-semibold leading-[.95] text-[#193c39]">The Ancient<br />Grain Bowl</h2></div><p className="max-w-[480px] text-sm leading-relaxed text-[#193c39]/80">Roasted, bright, crunchy, satisfying. It is the dish that makes “I’ll just have a salad” feel like a very good idea.</p></div><div className="tfk-image-wrap relative min-h-[250px] overflow-hidden sm:col-span-2"><img src={matchaImage} alt="Matcha latte at True Food Kitchen" className="tfk-image absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-4 left-4 rounded-full bg-[#f4f0e7] px-4 py-2 text-[.62rem] font-bold uppercase tracking-[.13em]">Sip something good</div></div></div></div>
      </section>

      <section className="bg-[#e9dfcf] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><p className="tfk-eyebrow text-[#e16f5e]">Weekends at Town Center</p><h2 className="tfk-display mt-4 text-6xl font-semibold leading-[.87] sm:text-8xl">Meet us<br /><span className="text-[#e16f5e]">for brunch.</span></h2><p className="mt-7 max-w-[420px] text-lg leading-relaxed text-[#486660]">Slow mornings, blueberry pancakes, green drinks, and a table big enough for the whole group. Saturdays and Sundays from 10am.</p><ActionLink href={RESERVATION_URL} dark testId="link-brunch-reservation">Book brunch</ActionLink></div><div className="tfk-image-wrap relative min-h-[360px] overflow-hidden sm:min-h-[490px]"><img src={brunchImage} alt="Blueberry pancakes served at weekend brunch" className="tfk-image absolute inset-0 h-full w-full object-cover" /><div className="absolute bottom-5 right-5 bg-[#193c39] px-4 py-3 text-right text-[#f4f0e7]"><span className="block text-[.6rem] uppercase tracking-[.18em] text-[#f5d89a]">Saturday + Sunday</span><span className="tfk-display text-2xl">10am–2pm</span></div></div></div>
      </section>

      <section id="gather" className="bg-[#ed7b66] px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-[1fr_auto]"><div><p className="tfk-eyebrow text-[#193c39]">Make a little room</p><h2 className="tfk-display mt-4 max-w-[760px] text-5xl font-semibold leading-[.9] text-[#193c39] sm:text-7xl">Bring the occasion.<br />We’ll bring the good stuff.</h2><p className="mt-7 max-w-[560px] text-lg leading-relaxed text-[#193c39]/80">From a team lunch to a birthday dinner, our Boca Raton dining room and patio are made for gathering. Ask about catering menus and private dining for your next one.</p></div><div className="flex flex-wrap gap-3"><a href="mailto:bocaratonevents@truefoodkitchen.com" data-testid="link-catering-email" className="inline-flex items-center gap-3 rounded-full bg-[#193c39] px-5 py-3 text-[.68rem] font-bold uppercase tracking-[.13em] text-[#f4f0e7] transition-transform hover:-translate-y-0.5">Plan your gathering <ArrowRight className="h-4 w-4" /></a></div></div>
      </section>

      <section id="visit" className="bg-[#193c39] px-5 py-20 text-[#f4f0e7] sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_.8fr]"><div><p className="tfk-eyebrow text-[#ed7b66]">Find us in Boca</p><h2 className="tfk-display mt-4 max-w-[700px] text-6xl font-semibold leading-[.87] sm:text-8xl">See you<br /><span className="text-[#f5d89a]">at the table.</span></h2><div className="mt-12 grid gap-8 sm:grid-cols-2"><div><div className="flex items-center gap-2 text-[#ed7b66]"><MapPin className="h-4 w-4" /><span className="tfk-eyebrow">Address</span></div><p className="mt-3 leading-relaxed text-[#c4cfbd]">Town Center at Boca Raton<br />6000 Glades Rd, Unit 1015A<br />Boca Raton, FL 33431</p><a href={MAP_URL} target="_blank" rel="noreferrer" data-testid="link-directions" className="tfk-link mt-4 inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[.13em] text-[#f5d89a]">Get directions <ExternalLink className="h-3.5 w-3.5" /></a></div><div><div className="flex items-center gap-2 text-[#ed7b66]"><Clock3 className="h-4 w-4" /><span className="tfk-eyebrow">Hours</span></div><p className="mt-3 leading-loose text-[#c4cfbd]">Mon–Thu <span className="float-right">11am–9pm</span><br />Fri <span className="float-right">11am–9:30pm</span><br />Sat <span className="float-right">10am–9:30pm</span><br />Sun <span className="float-right">10am–8pm</span></p></div></div></div><div className="border-t border-[#f4f0e7]/20 pt-7 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0"><p className="tfk-eyebrow text-[#ed7b66]">Stay in touch</p><p className="tfk-display mt-5 text-4xl leading-[.95]">Questions?<br />We’re here.</p><a href="tel:5614198105" data-testid="link-phone" className="mt-7 flex items-center gap-3 text-lg text-[#f5d89a] transition-colors hover:text-[#ed7b66]"><Phone className="h-5 w-5" />561-419-8105</a><a href={RESERVATION_URL} target="_blank" rel="noreferrer" data-testid="link-visit-reservation" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f4f0e7] px-5 py-3 text-[.68rem] font-bold uppercase tracking-[.13em] text-[#193c39]">Make a reservation <CalendarDays className="h-4 w-4" /></a><p className="mt-8 text-sm leading-relaxed text-[#c4cfbd]">Self parking is available at Town Center. Ask for our patio when you arrive.</p></div></div>
      </section>

      <footer className="bg-[#193c39] px-5 pb-8 text-[#f4f0e7] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 border-t border-[#f4f0e7]/20 pt-8 sm:flex-row sm:items-end sm:justify-between"><div><Mark light /><p className="mt-4 max-w-[330px] text-xs leading-relaxed text-[#aebfb4]">Whole-food cooking, seasonal ingredients, and a brighter way to dine in Boca Raton.</p></div><div className="flex items-center gap-5"><a href="https://www.instagram.com/truefoodkitchen/" target="_blank" rel="noreferrer" data-testid="link-instagram" aria-label="True Food Kitchen on Instagram" className="transition-colors hover:text-[#ed7b66]"><Instagram className="h-5 w-5" /></a><a href={ORDER_URL} target="_blank" rel="noreferrer" data-testid="link-footer-order" className="text-[.66rem] font-bold uppercase tracking-[.14em] text-[#f5d89a]">Order online <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></a></div></div>
        <div className="mx-auto mt-9 flex max-w-[1400px] flex-col justify-between gap-2 text-[.58rem] uppercase tracking-[.12em] text-[#718f87] sm:flex-row"><span>© 2025 True Food Kitchen Boca Raton</span><span>Eat well · Live well</span></div>
      </footer>
    </main>
  );
}

function Router() {
  return <ErrorBoundary resetKey={window.location.pathname}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;