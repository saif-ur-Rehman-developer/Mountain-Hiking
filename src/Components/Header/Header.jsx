'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import '../Header/Header.scss';
import Image from 'next/image';
import Logo from "../../../public/Images/logo.png";
function Header() {
  const [didScroll, setDidScroll] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const delta = 4;
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    function hasScrolled() {
      const st = window.scrollY;

      if (Math.abs(lastScrollTop - st) <= delta) return;

      if (st > lastScrollTop && st > navbarHeight) {
        document.querySelector('header')?.classList.remove('show-nav');
        document.querySelector('header')?.classList.add('hide-nav');
        document.querySelector('.nav-toggle')?.classList.remove('open');
        document.querySelector('.menu-left')?.classList.remove('collapse');
      } else {
        if (st + window.innerHeight < document.body.scrollHeight) {
          document.querySelector('header')?.classList.remove('hide-nav');
          document.querySelector('header')?.classList.add('show-nav');
        }
      }

      setLastScrollTop(st);
    }

    function scrollHandler() {
      setDidScroll(true);
    }

    window.addEventListener('scroll', scrollHandler);

    // Measure the navbarHeight when the component mounts
    const headerElement = document.querySelector('header');
    if (headerElement) {
      setNavbarHeight(headerElement.offsetHeight);
    }

    const scrollInterval = setInterval(() => {
      if (didScroll) {
        hasScrolled();
        setDidScroll(false);
      }
    }, 250);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearInterval(scrollInterval);
    };
  }, [didScroll, lastScrollTop, navbarHeight]);

  function handleLogoClick(e) {
    e.preventDefault();
    document.querySelector('.nav-toggle')?.classList.remove('open');
    document.querySelector('.menu-left')?.classList.remove('collapse');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleNavToggleClick() {
    document.querySelector('.nav-toggle')?.classList.toggle('open');
    document.querySelector('.menu-left')?.classList.toggle('collapse');
  }

  function handleMenuItemClick() {
    document.querySelector('.nav-toggle')?.classList.remove('open');
    document.querySelector('.menu-left')?.classList.remove('collapse');
  }

  return (
    <div>
      <header>
        <div className="headercontainer">
          <nav id="navigation">
            <div className="Logocontainer">
              <a  className="logo" onClick={handleLogoClick}>
             <Image
              src={Logo}
                alt='Logo  Main'
             />

        
            
              </a>
            </div>

            <a aria-label="mobile menu" className="nav-toggle" onClick={handleNavToggleClick}>
              <span></span>
              <span></span>
              <span></span>
            </a>
            <ul className="menu-left">
              <li>
                <Link href="/" onClick={handleMenuItemClick}>
                  Home
                </Link>
              </li>
              <li>
              <Link href="/about" onClick={handleMenuItemClick}>
                  About
                </Link>
              </li>
              <li>
              <Link href="/contact" onClick={handleMenuItemClick}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;