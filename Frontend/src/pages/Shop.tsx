import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { useCart, type Product } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Filter, Heart, ShoppingBag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type ExtendedProduct = Product & {
  brand: string;
  discountedPrice: number;
  gender: 'Men' | 'Women' | 'Unisex';
  categoryId: string;
  sizes: string[];
  stock: number;
  imageUrl: string;
};

const ALL_PRODUCTS: ExtendedProduct[] = [
  {
    id: '1',
    name: 'Air Max Phantom',
    brand: 'Nike',
    description: 'Ultimate performance with air-cushioned comfort.',
    price: 189.99,
    discountedPrice: 159.99,
    gender: 'Men',
    category: 'Running',
    categoryId: 'running',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
    stock: 24,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Velocity X-1',
    brand: 'Adidas',
    description: 'Sleek design for the modern urban explorer.',
    price: 159.99,
    discountedPrice: 139.99,
    gender: 'Men',
    category: 'Lifestyle',
    categoryId: 'lifestyle',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    stock: 18,
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    imageUrl:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Court Master Pro',
    brand: 'Puma',
    description: 'Maximum grip and stability on every court.',
    price: 129.99,
    discountedPrice: 109.99,
    gender: 'Men',
    category: 'Basketball',
    categoryId: 'basketball',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    stock: 30,
    image:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    imageUrl:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Trail Blazer G2',
    brand: 'Reebok',
    description: 'Rugged outsole for all-terrain adventures.',
    price: 145.5,
    discountedPrice: 119.99,
    gender: 'Unisex',
    category: 'Hiking',
    categoryId: 'hiking',
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    stock: 16,
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    imageUrl:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'Urban Glide',
    brand: 'New Balance',
    description: 'Lightweight and breathable for daily wear.',
    price: 99.0,
    discountedPrice: 79.99,
    gender: 'Women',
    category: 'Casual',
    categoryId: 'casual',
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    stock: 40,
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    imageUrl:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    name: 'Elite Racer',
    brand: 'Nike',
    description: 'Precision-engineered for speed and performance.',
    price: 210.0,
    discountedPrice: 189.99,
    gender: 'Men',
    category: 'Professional',
    categoryId: 'professional',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    imageUrl:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
  },
];

const allBrands = Array.from(new Set(ALL_PRODUCTS.map((p) => p.brand))).sort();
const allCategories = Array.from(new Set(ALL_PRODUCTS.map((p) => p.category))).sort();
const allGenders = Array.from(new Set(ALL_PRODUCTS.map((p) => p.gender))).sort();
const maxPrice = Math.ceil(Math.max(...ALL_PRODUCTS.map((p) => p.discountedPrice)));

export default function Shop() {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [search, setSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [maxFilterPrice, setMaxFilterPrice] = useState<number>(maxPrice);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const toggleInArray = (value: string, current: string[], setter: (v: string[]) => void) => {
    setter(
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setMaxFilterPrice(maxPrice);
    setSearch('');
  };

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const term = search.toLowerCase().trim();
      if (
        term &&
        !(
          product.name.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        )
      ) {
        return false;
      }

      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
      if (selectedCategories.length && !selectedCategories.includes(product.category))
        return false;
      if (selectedGenders.length && !selectedGenders.includes(product.gender)) return false;
      if (product.discountedPrice > maxFilterPrice) return false;

      return true;
    });
  }, [search, selectedBrands, selectedCategories, selectedGenders, maxFilterPrice]);

  const filtersPanel = (
    <div className="space-y-6 text-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Filters
        </p>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-[11px] font-bold text-muted-foreground hover:text-primary"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          Category
        </p>
        <div className="space-y-1">
          {allCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-border bg-transparent"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleInArray(cat, selectedCategories, setSelectedCategories)}
              />
              <span className="text-xs text-muted-foreground">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          Brand
        </p>
        <div className="space-y-1">
          {allBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-border bg-transparent"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleInArray(brand, selectedBrands, setSelectedBrands)}
              />
              <span className="text-xs text-muted-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          Gender
        </p>
        <div className="space-y-1">
          {allGenders.map((gender) => (
            <label key={gender} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-border bg-transparent"
                checked={selectedGenders.includes(gender)}
                onChange={() => toggleInArray(gender, selectedGenders, setSelectedGenders)}
              />
              <span className="text-xs text-muted-foreground">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          Price
        </p>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={maxFilterPrice}
            onChange={(e) => setMaxFilterPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-[11px] text-muted-foreground">
            Up to <span className="font-bold text-foreground">${maxFilterPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="pt-28 pb-24 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:bg-secondary/40"
              onClick={() => setShowFiltersMobile(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <div className="hidden md:flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                Shop All
              </h1>
              <button
                type="button"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-border/60 bg-secondary/40 hover:bg-secondary/60 text-muted-foreground"
                onClick={() => setFiltersExpanded((prev) => !prev)}
                title={filtersExpanded ? 'Hide filters' : 'Show filters'}
              >
                {filtersExpanded ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 md:max-w-md">
            <Input
              placeholder="Search by product, brand, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-full bg-secondary/40 border-border/60 text-sm"
            />
          </div>
        </div>

        <div
          className={cn(
            'grid gap-10',
            filtersExpanded ? 'md:grid-cols-[260px,1fr]' : 'md:grid-cols-1',
          )}
        >
          {/* Desktop filters */}
          {filtersExpanded && (
            <aside className="hidden md:block bg-secondary/20 border border-border/60 rounded-2xl p-6 sticky top-28 h-fit">
              {filtersPanel}
            </aside>
          )}

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
              <p>
                Showing{' '}
                <span className="font-bold text-foreground">{filteredProducts.length}</span> of{' '}
                <span className="font-bold text-foreground">{ALL_PRODUCTS.length}</span> products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="group bg-secondary/20 border-border/40 hover:border-primary/50 transition-all duration-500 overflow-hidden relative h-full flex flex-col">
                    <Link
                      to={`/product/${product.id}`}
                      className="block relative aspect-[4/5] overflow-hidden bg-secondary/30"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.discountedPrice < product.price && (
                        <Badge className="absolute top-4 left-4 rounded-full text-[11px] font-black uppercase tracking-widest">
                          {Math.round(
                            ((product.price - product.discountedPrice) / product.price) * 100,
                          )}
                          % OFF
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <Button
                          variant="secondary"
                          size="icon"
                          className={cn(
                            'rounded-full shadow-xl transition-all',
                            isInWishlist(product.id) &&
                              'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                          }}
                        >
                          <Heart
                            className={cn(
                              'h-5 w-5',
                              isInWishlist(product.id) && 'fill-current',
                            )}
                          />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full shadow-xl"
                          onClick={(e) => {
                            e.preventDefault();
                            addItem(product);
                          }}
                        >
                          <ShoppingBag className="h-5 w-5" />
                        </Button>
                      </div>
                    </Link>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-black mb-1">
                        {product.brand} • {product.gender}
                      </p>
                      <h3 className="text-sm font-bold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mb-2">{product.category}</p>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-base font-black">
                          ${product.discountedPrice.toFixed(2)}
                        </span>
                        {product.discountedPrice < product.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mb-1">
                        Sizes:{' '}
                        <span className="font-semibold text-foreground">
                          {product.sizes.join(', ')}
                        </span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Stock:{' '}
                        <span className="font-semibold text-foreground">{product.stock}</span>
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full font-bold rounded-full text-xs h-10"
                        onClick={() => addItem(product)}
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile filters drawer */}
        {showFiltersMobile && (
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden">
            <div className="absolute inset-y-0 left-0 w-[80%] max-w-xs bg-background border-r border-border/60 p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                  <Filter className="h-4 w-4" />
                  Filters
                </div>
                <button
                  type="button"
                  onClick={() => setShowFiltersMobile(false)}
                  className="rounded-full p-1 hover:bg-secondary/40"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2">{filtersPanel}</div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

