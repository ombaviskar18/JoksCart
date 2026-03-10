import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useCart, type Product } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, ShoppingBag, Heart, ChevronLeft, Truck, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Shoe3D } from '../components/Shoe3D';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Max Phantom',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Running',
    description: 'Ultimate performance with air-cushioned comfort. Engineered for the serious athlete who demands both style and substance. Featuring our latest foam technology and breathable mesh.'
  },
  {
    id: '2',
    name: 'Velocity X-1',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    description: 'Sleek design for the modern urban explorer. Versatile enough for any outfit, yet technically capable for long walks in the city.'
  },
  {
    id: '3',
    name: 'Court Master Pro',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    category: 'Basketball',
    description: 'Maximum grip and stability on every court. Built for quick cuts and high jumps, giving you the edge in every game.'
  },
  {
    id: '4',
    name: 'Trail Blazer G2',
    price: 145.50,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'Hiking',
    description: 'Rugged outsole for all-terrain adventures. Waterproof materials and reinforced toe box protect you in the harshest conditions.'
  },
  {
    id: '5',
    name: 'Urban Glide',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    category: 'Casual',
    description: 'Lightweight and breathable for daily wear. The perfect everyday shoe that combines comfort with a minimalist aesthetic.'
  },
  {
    id: '6',
    name: 'Elite Racer',
    price: 210.00,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    category: 'Professional',
    description: 'Precision-engineered for speed and performance. Every gram is calculated to give you the fastest time possible.'
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const product = SAMPLE_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="py-32 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-6">Product Not Found</h1>
          <Link to="/">
            <Button className="rounded-full">Return Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const sizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

  return (
    <Layout>
      <section className="py-32 pt-40 container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" /> Back to collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Media */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-secondary/20 border border-border/40 rounded-[2rem] overflow-hidden relative aspect-square group"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <Badge className="absolute top-6 left-6 py-1 px-4 text-xs font-black uppercase tracking-widest">
                New Arrival
              </Badge>
            </motion.div>

            {/* <div className="bg-secondary/10 border border-border/40 rounded-[2rem] p-8 hidden md:block">
              <h3 className="text-xl font-black mb-6 italic uppercase tracking-tighter">Interactive View</h3>
              <Shoe3D />
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-10 sticky top-32">
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={cn("h-4 w-4", i <= 4 ? "fill-primary text-primary" : "text-muted-foreground")} />
                  ))}
                </div>
                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">128 Reviews</span>
              </div>
              <p className="text-4xl font-black">${product.price}</p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Select Size</p>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-14 border border-border/50 rounded-xl font-black text-sm transition-all",
                      selectedSize === size 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-secondary/20 hover:border-primary/50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="h-16 flex-grow rounded-full text-lg font-black shadow-xl group"
                onClick={() => addItem(product)}
              >
                ADD TO CART <ShoppingBag className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className={cn("h-16 w-16 rounded-full border-border/50 group transition-all", isInWishlist(product.id) && "bg-destructive text-destructive-foreground border-destructive")}
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={cn("h-6 w-6 group-hover:fill-destructive group-hover:text-destructive transition-all", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>

            <div className="space-y-6 pt-10 border-t border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Free Shipping</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Authenticity Guaranteed</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">100% genuine products only</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/30 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">60 Day Returns</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Easy, no-questions returns</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-10 border-t border-border/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Product Details</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 bg-secondary/10 border-y border-border/40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">You Might Also Like</h2>
            <Link to="/shop" className="text-xs font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {SAMPLE_PRODUCTS.slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden mb-4 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{p.name}</h4>
                <p className="text-xs text-muted-foreground font-black">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
