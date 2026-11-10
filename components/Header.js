// 'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'TODO' },
  { href: '/help', label: '使い方' },
  { href: '/about', label: 'このアプリについて' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="header">
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'nav-link active' : 'nav-link'}
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
