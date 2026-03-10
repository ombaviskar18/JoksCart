import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-32 min-h-[70vh] flex flex-col items-center justify-center text-center container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter uppercase leading-none text-muted/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
            404
          </h1>
          <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase relative z-10">
            OFF THE <span className="text-muted-foreground">TRACK</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto relative z-10">
            The page you're looking for has run away. Let's get you back to the collection.
          </p>
          <Link to="/" className="relative z-10">
            <Button size="lg" className="rounded-full h-14 px-10 text-lg font-black shadow-xl group">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              BACK TO BASE
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};

export default NotFound;
