import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Shoe3D } from '../components/Shoe3D';
import CircularGallery from '../components/CircularGallery';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { useCart, type Product } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { ShoppingBag, ArrowRight, Heart, Filter, ChevronRight, Star } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Max Phantom',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Running',
    description: 'Ultimate performance with air-cushioned comfort.'
  },
  {
    id: '2',
    name: 'Velocity X-1',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    description: 'Sleek design for the modern urban explorer.'
  },
  {
    id: '3',
    name: 'Court Master Pro',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    category: 'Basketball',
    description: 'Maximum grip and stability on every court.'
  },
  {
    id: '4',
    name: 'Trail Blazer G2',
    price: 145.50,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'Hiking',
    description: 'Rugged outsole for all-terrain adventures.'
  },
  {
    id: '5',
    name: 'Urban Glide',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    category: 'Casual',
    description: 'Lightweight and breathable for daily wear.'
  },
  {
    id: '6',
    name: 'Elite Racer',
    price: 210.00,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    category: 'Professional',
    description: 'Precision-engineered for speed and performance.'
  },
];

const CATEGORIES = ['All', 'Running', 'Basketball', 'Lifestyle', 'Hiking', 'Casual'];

const BRAND_ITEMS = [
  { image: '/images/adidas.png', text: 'NIKE' },
  { image: '/images/adidas.png', text: 'ADIDAS' },
  { image: '/images/adidas.png', text: 'PUMA' },
  { image: '/images/adidas.png', text: 'REEBOK' },
  { image: '/images/adidas.png', text: 'ASICS' },
  { image: '/images/adidas.png', text: 'JORDAN' },
];

export default function Index() {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('All');
  const { scrollYProgress } = useScroll();
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const filteredProducts = activeCategory === 'All'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="secondary" className="mb-4 py-1 px-4 text-sm font-medium tracking-wide">NEW ARRIVALS 2026</Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight">
              STEP INTO <br />
              <span className="text-muted-foreground italic">FUTURE</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Explore our new generation of performance footwear. Designed for those who never stop moving.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-muted-foreground/20">
                View Gallery
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <Shoe3D />
           
          </motion.div>
        </div>
      </section>

      {/* Brand Carousel Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-black tracking-tight uppercase mb-8">
            Brands Available
          </h2>
          <div style={{ height: '360px', position: 'relative' }}>
            <CircularGallery
              items={BRAND_ITEMS}
              bend={2}
              textColor="#ffffff"
              borderRadius={0.15}
              scrollSpeed={3}
              scrollEase={0.05}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase italic">Featured Drop</h2>
              <p className="text-muted-foreground">Pick your style from our latest arrivals.</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group bg-secondary/20 border-border/40 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                  <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className={cn("rounded-full shadow-xl transition-all", isInWishlist(product.id) && "bg-destructive text-destructive-foreground hover:bg-destructive/90")}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                      >
                        <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
                      </Button>
                      <Button variant="secondary" size="icon" className="rounded-full shadow-xl" onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                      }}>
                        <ShoppingBag className="h-5 w-5" />
                      </Button>
                    </div>
                  </Link>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{product.category}</p>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-lg font-black">${product.price}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                    <div className="mt-4 flex items-center gap-1">
                      {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                      <Star className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground ml-2">(4.0 / 5)</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className="w-full font-bold group-hover:bg-primary/90" 
                      onClick={() => addItem(product)}
                    >
                      ADD TO CART
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-full font-bold border-white/10 hover:bg-secondary">
              LOAD MORE PRODUCTS
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional / Experience Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[15deg] translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-none italic">
                CRAFTED FOR THE <br /> ELITE ATHLETE
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-md text-lg">
                Our latest collection features high-performance materials and advanced engineering to help you reach your full potential.
              </p>
              <Button variant="secondary" size="lg" className="rounded-full font-bold h-14 px-8">
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" 
                  alt="Athlete"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 aspect-square w-32 bg-background text-foreground flex items-center justify-center rounded-2xl rotate-[-6deg] shadow-xl p-4">
                <div className="text-center">
                  <p className="text-3xl font-black leading-none">20+</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest mt-1 text-muted-foreground">Awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-32 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter">Stay Ahead of the Game</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join the JoksCart inner circle and be the first to know about exclusive drops, limited editions, and member-only events.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow h-14 bg-secondary/50 border-none rounded-full px-8 text-lg outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
              <Button className="h-14 px-10 rounded-full text-lg font-black shadow-xl">
                SUBSCRIBE
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-6 italic">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
