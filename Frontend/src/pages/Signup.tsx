import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight, Github, Chrome, User, ShieldCheck } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    navigate('/');
  };

  return (
    <Layout>
      <section className="py-32 min-h-screen flex items-center justify-center container mx-auto px-4 relative overflow-hidden">
        {/* Animated background background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-secondary/20 border border-border/40 p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative">
            <div className="text-center mb-10">
              <Link to="/" className="text-3xl font-black italic tracking-tighter mb-4 inline-block">JoksCart</Link>
              <h1 className="text-4xl font-black italic uppercase tracking-tight mb-2">Create Account</h1>
              <p className="text-muted-foreground text-sm font-medium">Join the JoksCart elite community.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">First Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="w-full h-14 bg-background border border-border/50 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">Last Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="w-full h-14 bg-background border border-border/50 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">Email address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full h-14 bg-background border border-border/50 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full h-14 bg-background border border-border/50 rounded-2xl pl-12 pr-12 outline-none focus:ring-2 focus:ring-primary transition-all text-sm font-bold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 px-1">
                <Checkbox id="terms" className="rounded-md h-5 w-5 mt-0.5" required />
                <label
                  htmlFor="terms"
                  className="text-[10px] font-bold leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground cursor-pointer uppercase tracking-widest"
                >
                  I agree to the <Link to="/terms" className="text-primary italic">Terms of Service</Link> and <Link to="/privacy" className="text-primary italic">Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" className="w-full h-14 rounded-full text-lg font-black shadow-xl group">
                CREATE ACCOUNT <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <p className="mt-10 text-center text-sm font-bold text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline italic">Log in here</Link>
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
