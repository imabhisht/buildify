<BrowserRouter>
         
<nav style={{height:"100vh"}} aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800">

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
  <div className="relative flex w-20 flex-col space-y-3 p-3">
    {sidebarNavigation.map((item) => (
      <Link to={item.href}>
      <a
        key={item.name}
        href={item.href}
        className={classNames(
          item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
          'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
        )}
      >
        <span className="sr-only">{item.name}</span>
        <item.icon className="h-6 w-6" aria-hidden="true" />
      </a>
      </Link>
    ))}
  </div>
</nav>

<main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
  <section
    aria-labelledby="primary-heading"
    className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
  >
    <h1 id="primary-heading" className="sr-only">
      Home
    </h1>
    <Routes>
      <Route path="/" element={<h1>Helo</h1>} />
      <Route path="/studio" element={<h1>About</h1>} />
    </Routes>
  </section>
</main>
</BrowserRouter>