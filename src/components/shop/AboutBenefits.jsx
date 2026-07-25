import React from 'react';
import { ShieldCheck, Truck, Percent, Headset, CheckCircle2 } from 'lucide-react';

const AboutBenefits = () => {
  const benefits = [
    {
      title: 'Wide Selection of Quality Products',
      desc: 'Carefully vetted goods ranging from clothing apparel, footwear, smart devices, to modern lifestyle decor.',
      icon: CheckCircle2,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
    },
    {
      title: 'Competitive Prices & Great Deals',
      desc: 'Top-tier catalog offerings curated directly to give you the highest value for your shopping budget.',
      icon: Percent,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
    },
    {
      title: 'Fast, Reliable Shipping',
      desc: 'Expedited fulfillment channels ensuring your orders reach your doorstep safe, secure, and on time.',
      icon: Truck,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
    },
    {
      title: 'Secure Checkout & Payment Options',
      desc: 'Shop with absolute peace of mind using our state-of-the-art SSL 256-bit encrypted card checkout system.',
      icon: ShieldCheck,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
    },
    {
      title: 'Friendly Customer Support',
      desc: 'Dedicated assistance experts standing by to address catalog inquiries or logistics questions.',
      icon: Headset,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
    }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white text-center">🛒 Why Shop With Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className={`inline-flex p-3 rounded-xl ${benefit.color}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutBenefits;
