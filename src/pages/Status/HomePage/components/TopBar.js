import React, { useEffect, useRef, useState } from "react";
import "./TopBar.css";

const sections = [
  { id: "program-overview", label: "Program Overview" },
  { id: "moa-information", label: "MOA Information" },
  { id: "beneficiary-directory", label: "Beneficiary Directory" },
  { id: "news-updates", label: "News & Updates" },
  { id: "photo-gallery", label: "Photo Gallery" },
  { id: "contact-information", label: "Contact Information" }
];

// Agro Connect Logo Component
const AgroConnectLogo = () => (
  <div className="logo-container">
    <div className="logo-icon-wrapper">
      <svg 
        className="logo-svg" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2L13.09 8.26L15 7L14.08 9.74L16 9L15.92 12H8.08L8 9L9.92 9.74L9 7L10.91 8.26L12 2Z"/>
        <path d="M12 14C10.9 14 10 14.9 10 16V22H14V16C14 14.9 13.1 14 12 14Z"/>
        <path d="M8 16C6.9 16 6 16.9 6 18V22H10V18C10 16.9 9.1 16 8 16Z"/>
        <path d="M16 16C14.9 16 14 16.9 14 18V22H18V18C18 16.9 17.1 16 16 16Z"/>
      </svg>
    </div>
    <div className="logo-text-wrapper">
      <span className="logo-main-text">Agro Connect</span>
      <span className="logo-sub-text">Agricultural Systems</span>
    </div>
  </div>
);

export default function TopBar() {
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(80);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingToSection, setIsScrollingToSection] = useState(false);
  const [targetSectionId, setTargetSectionId] = useState(null);
  const navRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const computeOffset = () => {
      const height = navRef.current ? navRef.current.offsetHeight : 80;
      setHeaderOffset(height);
    };
    computeOffset();
    window.addEventListener("resize", computeOffset);
    return () => window.removeEventListener("resize", computeOffset);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      
      // If we're currently scrolling to a section, don't update the active section
      // until the scrolling is complete
      if (isScrollingToSection && targetSectionId) {
        return;
      }
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce the section detection to prevent rapid changes
      scrollTimeoutRef.current = setTimeout(() => {
        let currentSection = null;
        const offset = headerOffset + 50;
        
        // Find the section that's most visible in the viewport
        let maxVisibleHeight = 0;
        
        sections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollPosition;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Calculate how much of the section is visible
            const viewportTop = scrollPosition + offset;
            const viewportBottom = scrollPosition + window.innerHeight;
            
            const visibleTop = Math.max(elementTop, viewportTop);
            const visibleBottom = Math.min(elementBottom, viewportBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              currentSection = section.id;
            }
          }
        });
        
        setActiveSectionId(currentSection);
      }, 100); // 100ms debounce
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [headerOffset, isScrollingToSection, targetSectionId]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Immediately set the target section and scrolling state
      setIsScrollingToSection(true);
      setTargetSectionId(id);
      setActiveSectionId(id); // Immediately highlight the target section
      setIsMenuOpen(false);
      
      const y = element.getBoundingClientRect().top + window.scrollY - headerOffset - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Reset the scrolling state after a delay
      setTimeout(() => {
        setIsScrollingToSection(false);
        setTargetSectionId(null);
      }, 1000); // Wait for smooth scroll to complete
    }
  };

  return (
    <nav 
      ref={navRef} 
      className={`topbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="topbar-container">
        <button
          type="button"
          onClick={() => {
            setIsScrollingToSection(true);
            setTargetSectionId(null);
            setActiveSectionId(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              setIsScrollingToSection(false);
            }, 1000);
          }}
          className="logo-button"
        >
          <AgroConnectLogo />
        </button>

        <div className="desktop-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? "page" : undefined}
              className={`nav-item ${activeSectionId === section.id ? 'active' : ''}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="desktop-actions">
          <button
            type="button"
            onClick={() => scrollToSection("login-options")}
            className="login-button"
          >
            Login
          </button>
        </div>

        <div className="mobile-menu-wrapper">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            className="mobile-menu-toggle"
          >
            <svg className="menu-icon" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="primary-menu" className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? "page" : undefined}
              className={`mobile-nav-item ${activeSectionId === section.id ? 'active' : ''}`}
            >
              {section.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("login-options")}
            className="mobile-login-button"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}