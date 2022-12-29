import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <header>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/events">events</Link>
      <Link href="/about-us">About us</Link>
    </nav>
  </header>
  )
}

export default Header