import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Checkbox } from '../components/ui/checkbox';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/');
  };

  return (
    <Layout>
      <section className="py-32 min-h-screen flex items-center justify-center container mx-auto px-4 relative overflow-hidden">
        {/* Animated background background elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-muted/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-secondary/20 border border-border/40 p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative">
            <div className="text-center mb-10">
              <Link to="/" className="text-3xl font-black italic tracking-tighter mb-4 inline-block">JoksCart</Link>
              <h1 className="text-4xl font-black italic uppercase tracking-tight mb-2">Welcome Back</h1>
              <p className="text-muted-foreground text-sm font-medium">Log in to your account and keep moving.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
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
                <div className="flex items-center justify-between px-1">
                  <Label htmlFor="password" className="text-xs uppercase font-black tracking-widest text-muted-foreground ml-1">Password</Label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground hover:text-primary transition-colors">
                    Forgot password?
                  </Link>
                </div>
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

              <div className="flex items-center space-x-2 px-1">
                <Checkbox id="remember" className="rounded-md h-5 w-5" />
                <label
                  htmlFor="remember"
                  className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

              <Button type="submit" className="w-full h-14 rounded-full text-lg font-black shadow-xl group">
                LOG IN <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50"></span>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-secondary/20 px-4 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-2xl h-12 border-border/50 font-black text-xs gap-2">
                  <Chrome className="h-4 w-4" /> GOOGLE
                </Button>
                <Button variant="outline" className="rounded-2xl h-12 border-border/50 font-black text-xs gap-2">
                  <Github className="h-4 w-4" /> GITHUB
                </Button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm font-bold text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline italic">Create account</Link>
            </p>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
