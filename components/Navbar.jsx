   'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const NAV_ITEMS = [
  { label: 'Listings', href: '/Property' },
  { label: 'Sample', href: '/samplepreperty' },
  { label: 'Agent', href: '/agents' },
  { label: 'Services', href: '/Service' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  const handleNavigation = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname && pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 shadow-xl">
      <nav
        className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-6"
        style={{
          background: 'linear-gradient(90deg, #2a3cff 0%, #35e8ff 100%)',
          boxShadow: '0 2px 12px rgba(42,60,255,0.09)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
        aria-label="Main"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={handleNavigation}
          className="group inline-flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="sr-only">BUY YOUR DREAM</span>
          <h1 className="text-xl font-serif tracking-wide text-white md:text-2xl">
            BUY-YOUR-
            <span className="text-3xl text-cyan-300 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 md:text-4xl">
              D
            </span>
            REAM
          </h1>
        </Link>

        {/* Right: Auth + Toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-md outline-none ring-green-300 transition-all hover:bg-green-600 focus-visible:ring-4 md:px-5"
                aria-label="Sign in"
              >
                <abbr title="Sign In to your account" className="no-underline">
                  Sign In
                </abbr>
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-md outline-none ring-cyan-300 transition-all hover:bg-cyan-600 focus-visible:ring-4 md:px-5"
                aria-label="Sign up"
              >
                <abbr title="Create a new account" className="no-underline">
                  Sign Up
                </abbr>
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 border-2 border-cyan-300 shadow-lg' } }} />
          </SignedIn>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white bg-cyan-400/20 hover:bg-cyan-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:block md:grow md:basis-0">
          <ul id="primary-navigation" className="flex items-center justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={item.prefetch}
                  onClick={handleNavigation}
                  className={[
                    'rounded-md px-2 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                    isActive(item.href)
                      ? 'text-cyan-300 bg-white/5 shadow'
                      : 'text-white hover:text-cyan-200 hover:bg-white/10',
                  ].join(' ')}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile slide-over menu */}
      <div
        className={['md:hidden', 'fixed inset-0 z-40', isOpen ? 'pointer-events-auto' : 'pointer-events-none'].join(' ')}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div
          className={['absolute inset-0 bg-black/40 transition-opacity', isOpen ? 'opacity-100' : 'opacity-0'].join(' ')}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <div
          className={[
            'absolute left-0 top-0 h-full w-72 max-w-[85vw] transform bg-gradient-to-br from-blue-900 via-cyan-700 to-blue-700 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <Link href="/" onClick={handleNavigation} className="text-lg font-serif text-white">
              BUY-YOUR-<span className="text-2xl text-cyan-300">D</span>REAM
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white bg-cyan-400/20 hover:bg-cyan-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="px-2 py-3">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={item.prefetch}
                    onClick={handleNavigation}
                    className={[
                      'block rounded-lg px-3 py-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
                      isActive(item.href)
                        ? 'bg-cyan-600/30 text-cyan-200 shadow'
                        : 'text-white hover:bg-white/10 hover:text-cyan-100',
                    ].join(' ')}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-md outline-none ring-green-300 transition hover:bg-green-600 focus-visible:ring-4">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-md outline-none ring-cyan-300 transition hover:bg-cyan-600 focus-visible:ring-4">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 border-2 border-cyan-300 shadow-lg' } }} />
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;           
