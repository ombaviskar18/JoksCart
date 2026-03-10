import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useCart } from '@/hooks/use-cart';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'JOKS20') {
      setDiscount(totalPrice * 0.2);
    } else {
      alert('Invalid coupon code. Try JOKS20');
    }
  };

  const finalTotal = totalPrice - discount;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-32 min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase">Your cart is empty</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
              Looks like you haven't added anything to your cart yet. Time to explore our collection.
            </p>
            <Link to="/">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-black shadow-xl">
                CONTINUE SHOPPING <ArrowRight className="ml-2 h-5 w-5" />
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
        <h1 className="text-4xl md:text-6xl font-black mb-12 italic tracking-tighter uppercase leading-none">Your <span className="text-muted-foreground">Cart</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col sm:flex-row items-center gap-6 bg-secondary/20 border border-border/40 p-6 rounded-2xl relative group overflow-hidden"
                  >
                    <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-secondary/30">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="text-xl font-black mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-background/50 rounded-full p-1 border border-border/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 w-8 hover:bg-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-8 w-8 hover:bg-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-center sm:text-right min-w-[100px]">
                      <p className="text-lg font-black">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground font-bold tracking-widest mt-1 uppercase">${item.price} each</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive transition-colors rounded-full"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-secondary/20 border border-border/40 p-8 rounded-3xl sticky top-32">
              <h2 className="text-2xl font-black mb-6 italic uppercase tracking-tighter">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-bold">Subtotal ({totalItems} items)</span>
                  <span className="font-black">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span className="font-bold">Shipping</span>
                  <span className="font-black text-primary italic uppercase tracking-widest text-xs">Calculated at checkout</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span className="font-bold">Discount (20%)</span>
                    <span className="font-black">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="bg-border/50 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-xl font-black italic uppercase tracking-tighter">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black">${finalTotal.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Including all taxes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> Have a promo code?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code"
                    className="flex-grow bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all h-12"
                  />
                  <Button variant="outline" className="rounded-xl font-black px-6 h-12 border-border/50" onClick={handleApplyCoupon}>
                    APPLY
                  </Button>
                </div>
                {discount === 0 && (
                  <p className="text-[10px] text-muted-foreground italic">Try "JOKS20" for 20% off!</p>
                )}
              </div>

              <Link to="/checkout">
                <Button className="w-full h-14 rounded-full text-lg font-black shadow-xl group">
                  CHECKOUT <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <div className="mt-8 flex items-center justify-center gap-4 grayscale opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
