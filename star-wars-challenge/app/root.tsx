import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { useState } from 'react';
import stylesheet from '~/tailwind.css?url';
import { Navbar, SidebarMenu } from './components/shared';
import { Bars2Icon, XCircleIcon } from '@heroicons/react/24/solid';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="relative flex">
        {isSidebarOpen && <SidebarMenu toggleSidebar={toggleSidebar} />}

        <button
          onClick={toggleSidebar}
          className="absolute left-0 top-0 z-50 m-2 lg:hidden"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <XCircleIcon className="h-8 w-8 text-gray-800" />
          ) : (
            <Bars2Icon className="h-8 w-8 text-gray-800" />
          )}
        </button>

        <main className="h-full w-full flex-1">
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className="scrollbar-hide h-full overflow-x-hidden overflow-y-scroll p-5">
            {children}
          </div>
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
