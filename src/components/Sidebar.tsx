'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { authClient, useSession } from '@/lib/auth-client';
import {
  Home,
  Users,
  Building2,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import * as React from 'react';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/companies', label: 'Companies', icon: Building2 },
  { href: '/search', label: 'Intelligent Search', icon: Search },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const saved =
      typeof window !== 'undefined'
        ? localStorage.getItem('sidebar_collapsed')
        : null;
    if (saved) setCollapsed(saved === '1');
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(c => {
      const next = !c;
      if (typeof window !== 'undefined')
        localStorage.setItem('sidebar_collapsed', next ? '1' : '0');
      return next;
    });
  };

  const handleSignOut = async () => {
    // Use built-in auth client signOut to avoid INVALID_ORIGIN from custom fetch options
    const { error } = await authClient.signOut();
    if (!error?.code) {
      localStorage.removeItem('bearer_token');
      // Attendere il completamento del refetch prima di reindirizzare
      await refetch();
      // Aggiungere un piccolo ritardo per assicurarsi che lo stato sia completamente aggiornato
      setTimeout(() => {
        router.push('/sign-in');
      }, 100);
    }
  };

  // While session is loading, render a fixed-width skeleton to avoid layout shift
  if (isPending) {
    return (
      <aside
        className={cn(
          'h-[calc(100dvh-2rem)] md:h-[calc(100dvh-3rem)] sticky top-4 md:top-6 hidden md:flex md:flex-col w-64 rounded-2xl bg-card border shadow-sm p-2'
        )}
      >
        <div className='flex items-center justify-between gap-2 px-2 py-1.5'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-md bg-muted animate-pulse' />
            <div className='h-4 w-24 bg-muted rounded animate-pulse' />
          </div>
          <div className='h-8 w-8 rounded-full bg-muted animate-pulse' />
        </div>
        <div className='flex-1 p-2 space-y-2'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='h-9 rounded-xl bg-muted animate-pulse' />
          ))}
        </div>
        <div className='p-2'>
          <div className='h-9 rounded-xl bg-muted animate-pulse' />
        </div>
      </aside>
    );
  }

  // Only show sidebar when logged in
  if (!session?.user) return null;

  const initials = (session.user.name || session.user.email || '?')
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside
      className={cn(
        'h-[calc(100dvh-2rem)] md:h-[calc(100dvh-3rem)] sticky top-4 md:top-6 hidden md:flex md:flex-col transition-[width] duration-200 rounded-2xl bg-card border shadow-sm p-2',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand row */}
      <div className='flex items-center justify-between gap-2 px-2 py-1.5'>
        <Link href='/dashboard' className='flex items-center gap-2 min-w-0'>
          <div className='h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0'>
            <span className='text-xs font-semibold'>Px</span>
          </div>
          <span
            className={cn(
              'font-semibold text-lg truncate',
              collapsed && 'sr-only'
            )}
          >
            Pixrid
          </span>
        </Link>
        <div className='flex items-center gap-1'>
          <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
            {initials}
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0'
            onClick={toggleCollapsed}
            aria-label='Toggle sidebar'
          >
            {collapsed ? (
              <ChevronRight className='h-4 w-4' />
            ) : (
              <ChevronLeft className='h-4 w-4' />
            )}
          </Button>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 p-1 space-y-1 overflow-y-auto'>
        {NAV.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href;

          // Gestore di eventi per tutti i link
          const handleNavigation = (e: React.MouseEvent) => {
            e.preventDefault();
            router.push(item.href);
          };

          return (
            <div
              key={item.href}
              onClick={handleNavigation}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer',
                active && 'bg-background text-foreground shadow-sm',
                collapsed && 'justify-center'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className='h-5 w-5' />
              <span className={cn(collapsed && 'sr-only')}>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='p-1 border-t'>
        <Button
          variant='outline'
          className={cn(
            'w-full rounded-xl',
            collapsed && 'px-0 justify-center'
          )}
          onClick={handleSignOut}
        >
          {collapsed ? <span className='sr-only'>Sign out</span> : 'Sign out'}
        </Button>
      </div>
    </aside>
  );
}
