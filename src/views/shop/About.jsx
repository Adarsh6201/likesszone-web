import React from 'react';
import LogoImage from '../../assets/logo.png';
import AboutBenefits from '../../components/shop/AboutBenefits';
import { Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Brand Hero Visual Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-slate-900 to-slate-950"></div>
        <div className="relative max-w-3xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <img 
            src={LogoImage} 
            alt="Likesszon Logo" 
            className="h-28 w-28 md:h-36 md:w-36 object-contain rounded-full shadow-lg border-2 border-indigo-500/20 bg-white" 
          />
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">About LIKESSZON SHOPING</h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Your Ultimate Online Shopping Destination! We bring you a seamless and secure online shopping experience designed to meet your everyday needs.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          At LIKESSZON SHOPING, we bring you a seamless and secure online shopping experience designed to meet your everyday needs. Whether you're looking for the latest trends, must-have gadgets, or unique lifestyle products, we’ve got you covered — all in one place.
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          From browsing to checkout, we make online shopping simple, enjoyable, and hassle-free. Discover products you’ll love, enjoy fast delivery, and experience service that puts your satisfaction first.
        </p>
      </section>

      {/* Why Shop Cards Grid */}
      <AboutBenefits />

      {/* Contact & Store Location Card */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-sm space-y-6">
        <h2 className="text-xl md:text-2xl font-black tracking-tight">Visit Us & Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="p-3 rounded-xl bg-indigo-600 text-white shrink-0">
              <Phone className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-base">Contact Us</h3>
              <p className="text-slate-300">Have questions or need assistance? Call our dedicated support line:</p>
              <a href="tel:9304264241" className="inline-block text-indigo-400 font-bold text-lg hover:underline mt-1">
                +91 9304264241
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="p-3 rounded-xl bg-indigo-600 text-white shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-base">Visit Us</h3>
              <p className="text-slate-300 leading-relaxed">
                New Area 1St Gali Okni near Joda shiv temple ward 20, Hazaribagh, Jharkhand, 825301
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom invitation */}
      <section className="text-center py-6">
        <p className="text-sm font-semibold text-slate-500 mb-4">Start shopping today and experience the difference with LIKESSZON SHOPING.</p>
        <a 
          href="/shop"
          className="inline-block rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-transform active:scale-95"
        >
          Explore Collection
        </a>
      </section>

    </div>
  );
};

export default About;
