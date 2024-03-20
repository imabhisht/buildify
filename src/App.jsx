import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Editor from "./pages/editor/App";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  ArchiveBoxIcon,
  Bars3Icon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon,
  Square2StackIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

import HomePage from "./pages/Home/Home";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];
const sidebarNavigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { name: "Studio", href: "/studio", icon: Square2StackIcon, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: NoSymbolIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilSquareIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex h-full flex-col">
        {/* Top nav*/}

        {/* Bottom section */}
        <BrowserRouter>
          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Narrow sidebar*/}

            <nav
              style={{ height: "100vh" }}
              aria-label="Sidebar"
              className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
            >
              <header className="relative flex h-16 flex-shrink-0 items-center bg-white">
                {/* Logo area */}
                <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
                  <a
                    href="#"
                    className="flex h-16 w-16 items-center justify-center bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
                  >
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt="Your Company"
                    />
                  </a>
                </div>
              </header>
              <div className="relative flex w-20 flex-col space-y-3 p-3">
                {sidebarNavigation.map((item) => (
                  <Link to={item.href}>
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-400 hover:bg-gray-700",
                        "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
                      )}
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Main area */}
            <main className="min-w-0 flex-1 border-gray-200 lg:flex">
              {/* Primary column */}
              <section
                aria-labelledby="primary-heading"
                className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/studio" element={<Editor />} />
                </Routes>
              </section>
            </main>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}
