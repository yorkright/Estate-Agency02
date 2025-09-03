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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 dark:bg-gray-900/80 dark:border-gray-700">
      <nav
        className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-6"
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
          <h1 className="text-xl font-serif tracking-wide text-gray-100 md:text-2xl">
            BUY-YOUR-
            <span className="text-3xl text-green-500 transition-transform duration-300 group-hover:scale-110 md:text-4xl">
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
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white outline-none ring-green-300 transition-all hover:bg-green-700 focus-visible:ring-4 md:px-5"
                aria-label="Sign in"
              >
                <abbr title="Sign In to your account" className="no-underline">
                  Sign In
                </abbr>
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white outline-none ring-emerald-300 transition-all hover:bg-emerald-700 focus-visible:ring-4 md:px-5"
                aria-label="Sign up"
              >
                <abbr title="Create a new account" className="no-underline">
                  Sign Up
                </abbr>
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
          </SignedIn>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 md:hidden"
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
                    'rounded-md px-2 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                    isActive(item.href)
                      ? 'text-blue-400'
                      : 'text-gray-100 hover:text-blue-300',
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
            'absolute left-0 top-0 h-full w-72 max-w-[85vw] transform bg-slate-900 shadow-xl ring-1 ring-black/10 transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <Link href="/" onClick={handleNavigation} className="text-lg font-serif text-gray-100">
              BUY-YOUR-<span className="text-2xl text-green-500">D</span>REAM
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-300 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
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
                      'block rounded-md px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                      isActive(item.href) ? 'bg-blue-600/20 text-blue-300' : 'text-gray-100 hover:bg-white/5',
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
                  <button className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white outline-none ring-green-300 transition hover:bg-green-700 focus-visible:ring-4">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white outline-none ring-emerald-300 transition hover:bg-emerald-700 focus-visible:ring-4">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
