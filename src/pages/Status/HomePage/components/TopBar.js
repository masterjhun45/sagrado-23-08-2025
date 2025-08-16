import React from "react";

const sections = [
  { id: "program-overview", label: "Program Overview" },
  { id: "moa-information", label: "MOA Information" },
  { id: "beneficiary-directory", label: "Beneficiary Directory" },
  { id: "news-updates", label: "News & Updates" },
  { id: "photo-gallery", label: "Photo Gallery" },
  { id: "contact-information", label: "Contact Information" }
];

export default function TopBar() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <div className="text-white text-lg font-bold tracking-wide">
          OPOL AGRISYS
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleScroll(section.id)}
              className="px-4 py-2 text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
