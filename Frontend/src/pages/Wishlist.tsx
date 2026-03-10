import React from 'react';
import { Layout } from '../components/Layout';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import { Button } from '../components/ui/button';
import { Trash2, Heart, ShoppingBag, ArrowRight, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product: any) => {
    addItem(product);
    toggleWishlist(product);
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <section className="py-32 min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase">Your wishlist is empty</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
              Save your favorite sneakers for later. Tap the heart on any product to add it here.
            </p>
            <Link to="/">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-black shadow-xl">
                START EXPLORING <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-32 pt-40 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12 gap-6">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Your <span className="text-muted-foreground">Wishlist</span></h1>
          <Button variant="ghost" onClick={clearWishlist} className="text-muted-foreground hover:text-destructive font-bold uppercase tracking-widest text-xs">
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-secondary/20 border border-border/40 hover:border-primary/50 transition-all duration-500 rounded-3xl overflow-hidden relative"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center text-destructive transition-transform hover:scale-110"
                  >
                    <HeartOff className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{item.category}</p>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-black group-hover:text-primary transition-colors line-clamp-1 italic uppercase tracking-tighter">{item.name}</h3>
                    </Link>
                    <p className="text-xl font-black mt-2">${item.price}</p>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleMoveToCart(item)}
                      className="w-full h-12 rounded-xl font-black text-sm shadow-lg group/btn"
                    >
                      MOVE TO CART <ShoppingBag className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => toggleWishlist(item)}
                      className="w-full h-10 text-muted-foreground hover:text-destructive text-[10px] font-black uppercase tracking-widest"
                    >
                      Remove from Wishlist
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}
