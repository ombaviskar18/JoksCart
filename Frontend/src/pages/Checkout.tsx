import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useCart } from '@/hooks/use-cart';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { ArrowRight, CreditCard, Truck, ShieldCheck, MapPin, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Separator } from '../components/ui/separator';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (items.length === 0 && step < 3) {
    return (
      <Layout>
        <section className="py-32 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-6">Your cart is empty</h1>
          <Link to="/">
            <Button size="lg" className="rounded-full font-black">CONTINUE SHOPPING</Button>
          </Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-32 pt-40 container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/cart" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm font-black uppercase tracking-widest">
            <ChevronLeft className="h-4 w-4" /> Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">1</span>
                  Shipping Details
                </h2>
                <form className="space-y-6 bg-secondary/10 p-8 rounded-3xl border border-border/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email address</Label>
                      <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                      <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name</Label>
                    <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Shipping Address</Label>
                    <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all mb-4" placeholder="Street Address" />
                    <div className="grid grid-cols-3 gap-4">
                      <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="City" />
                      <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="State" />
                      <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="ZIP" />
                    </div>
                  </div>
                  <Button type="button" onClick={() => setStep(2)} className="w-full h-14 rounded-full text-lg font-black shadow-xl mt-4">
                    CONTINUE TO PAYMENT <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic">2</span>
                  Payment Method
                </h2>
                <div className="bg-secondary/10 p-8 rounded-3xl border border-border/40 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-4 p-4 rounded-2xl border-2 border-primary bg-primary/5 text-left transition-all">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight">Credit Card</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Visa, Mastercard, Amex</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 rounded-2xl border-2 border-transparent bg-background text-left transition-all hover:border-border">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight">PayPal</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Express Checkout</p>
                      </div>
                    </button>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Card Number</Label>
                      <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Expiry Date</Label>
                        <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">CVV</Label>
                        <input className="w-full h-12 bg-background border border-border/50 rounded-xl px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="•••" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handlePlaceOrder} className="w-full h-14 rounded-full text-lg font-black shadow-xl mt-4">
                    PLACE ORDER (${(totalPrice + 15).toFixed(2)})
                  </Button>
                  <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck className="h-3 w-3" /> Secure SSL Encrypted Payment
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 bg-secondary/10 rounded-3xl border border-border/40"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-4xl font-black mb-4 italic uppercase tracking-tighter">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto font-bold">
                  Thank you for your purchase. Your order #JOKS-{Math.floor(Math.random() * 90000) + 10000} has been placed successfully and will be shipped soon.
                </p>
                <Link to="/">
                  <Button size="lg" className="rounded-full h-14 px-10 font-black">
                    BACK TO HOME
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Sidebar Summary */}
          {step < 3 && (
            <div className="lg:col-span-4">
              <div className="bg-secondary/20 border border-border/40 p-8 rounded-3xl sticky top-32">
                <h3 className="text-xl font-black mb-6 italic uppercase tracking-tighter">Summary</h3>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/30">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-black truncate w-32">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-xs font-black">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator className="bg-border/50 mb-6" />
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-muted-foreground font-bold">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-bold">
                    <span>Shipping</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-bold">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-lg font-black uppercase tracking-tighter italic">Total</span>
                    <span className="text-2xl font-black">${(totalPrice + 15).toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Truck className="h-3 w-3" /> Delivery in 2-4 business days
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Shipped from Portland, OR
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
