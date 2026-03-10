import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).split('/')[0] || 'Page';
  const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <Layout>
      <section className="py-32 pt-40 container mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase leading-none">
            {formattedName} <span className="text-muted-foreground">Coming Soon</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
            We're currently crafting the perfect experience for the {formattedName} page. Stay tuned for exclusive drops and features.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full h-14 px-10 text-lg font-black shadow-xl group">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              BACK TO HOME
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
