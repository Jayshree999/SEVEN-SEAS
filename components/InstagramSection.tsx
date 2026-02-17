import React from 'react';

const InstagramSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Luxury Background Elements - Gold Theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-gray-900 leading-tight mb-3 sm:mb-4 px-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Follow Our <span className="text-amber-600">Journey</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Discover luxury properties, behind-the-scenes content, and exclusive insights from Dubai's premier hospitality destination.
            </p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-600 mx-auto mt-4 sm:mt-6 md:mt-8"></div>
          </div>

          {/* Instagram Feed */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-2xl p-4 sm:p-6 md:p-8">
              {/* Instagram Profile Embed */}
              <div className="w-full max-w-6xl mx-auto">
                <iframe
                  src="https://www.instagram.com/sevenseashoteldubai/embed/"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="yes"
                  className="rounded-xl sm:rounded-2xl"
                  title="Seven Seas Hotel Dubai Instagram Feed"
                ></iframe>
              </div>
              
              {/* Follow Button */}
              <div className="text-center mt-6 sm:mt-8">
                <a
                  href="https://www.instagram.com/sevenseashoteldubai/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-light tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="hidden sm:inline">Follow @sevenseashoteldubai</span>
                  <span className="sm:hidden">Follow Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Alternative: Instagram Rails Grid */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-gray-500 font-light mb-4 sm:mb-6 px-2">
              Can't see our Instagram feed? 
              <a 
                href="https://www.instagram.com/sevenseashoteldubai/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 transition-colors duration-300 ml-1"
              >
                Visit our Instagram directly
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
