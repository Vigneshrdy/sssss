"use client"

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ArrowRight, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Home, Gem, Crown, Sparkles, User } from 'lucide-react';
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { NavBar } from "@/components/ui/tubelight-navbar";
import Image from "next/image";
import Link from "next/link";

// Button component from the provided code
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Navigation items for the tubelight navbar
const navItems = [
  { name: 'Home', url: 'hero', icon: Home },
  { name: 'Collections', url: 'collections', icon: Gem },
  { name: 'Rings', url: 'rings', icon: Crown },
  { name: 'Necklaces', url: 'necklaces', icon: Sparkles },
  { name: 'About', url: 'about', icon: User },
];

// Header Component with logo
function Header() {
  return (
    <header className="w-full border-b border-amber-100/20 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/favicon-32x32.png"
              alt="Solevea Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div className="text-2xl font-bold tracking-tight text-amber-800">
              SOLEVEA
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Heart className="w-5 h-5 text-stone-400 hover:text-amber-600 cursor-pointer transition-colors" />
            <ShoppingBag className="w-5 h-5 text-stone-400 hover:text-amber-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
}

// Hero Component - Center aligned without featured ring
function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["timeless", "elegant", "exquisite", "radiant", "precious"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div id="hero" className="w-full bg-gradient-to-br from-stone-50 via-white to-amber-50/30 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center min-h-screen py-20">
          <div className="flex gap-8 flex-col items-center text-center max-w-4xl">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-stone-600 font-medium">Trusted by 10,000+ customers</span>
            </div>
                        
            <div className="flex gap-6 flex-col items-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl max-w-4xl tracking-tight text-center font-light leading-[1.1]">
                <span className="text-stone-800">Discover</span>
                <span className="relative flex w-full overflow-hidden md:pb-2 md:pt-1 justify-center">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-normal text-amber-700"
                      initial={{ opacity: 0, y: "100%" }}
                      transition={{ type: "spring", stiffness: 50, damping: 25 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? "-100%" : "100%",
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
                <br />
                <span className="text-stone-800">jewelry</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-stone-600 max-w-2xl font-light text-center">
                Handcrafted with precision and passion. Each piece tells a unique story of elegance, designed to celebrate life's most precious moments.
              </p>
            </div>
                        
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-3 bg-amber-800 hover:bg-amber-900 text-white px-8 py-4 text-base font-medium">
                Shop Collection <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-3 border-amber-200 text-amber-800 hover:bg-amber-50 px-8 py-4 text-base font-medium">
                View Lookbook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Collections Section with 3D Carousel
function CollectionsSection() {
  const collectionItems = [
    { url: "/solevea-logo.png", name: "Vintage Collection", price: "From $1,200" },
    { url: "/solevea-logo.png", name: "Modern Minimalist", price: "From $800" },
    { url: "/solevea-logo.png", name: "Art Deco", price: "From $1,500" },
    { url: "/solevea-logo.png", name: "Nature Inspired", price: "From $950" },
    { url: "/solevea-logo.png", name: "Bridal Collection", price: "From $2,000" },
  ];

  return (
    <section id="collections" className="py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-amber-900 mb-4">Our Collections</h2>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Explore our curated collections, each telling a unique story of craftsmanship and elegance
          </p>
        </div>
      </div>
    </section>
  );
}

// Rings Section
function RingsSection() {
  const ringItems = [
    { url: "/solevea-logo.png", name: "Diamond Solitaire", price: "$2,890" },
    { url: "/solevea-logo.png", name: "Vintage Rose Gold", price: "$1,750" },
    { url: "/solevea-logo.png", name: "Eternity Band", price: "$3,200" },
    { url: "/solevea-logo.png", name: "Halo Setting", price: "$4,100" },
    { url: "/solevea-logo.png", name: "Three Stone", price: "$2,650" },
    { url: "/solevea-logo.png", name: "Stackable Rings", price: "$890" },
  ];

  return (
    <section id="rings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-amber-900 mb-4">Exquisite Rings</h2>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            From engagement rings to everyday elegance, discover rings that capture your unique style
          </p>
        </div>
      </div>
    </section>
  );
}

// Necklaces Section
function NecklacesSection() {
  const necklaceItems = [
    { url: "/solevea-logo.png", name: "Pearl Cascade", price: "$3,200" },
    { url: "/solevea-logo.png", name: "Diamond Tennis", price: "$5,800" },
    { url: "/solevea-logo.png", name: "Gold Chain", price: "$1,450" },
    { url: "/solevea-logo.png", name: "Pendant Necklace", price: "$2,100" },
    { url: "/solevea-logo.png", name: "Choker Style", price: "$1,890" },
    { url: "/solevea-logo.png", name: "Layered Chains", price: "$2,750" },
  ];

  return (
    <section id="necklaces" className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-amber-900 mb-4">Stunning Necklaces</h2>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Graceful necklaces that frame your beauty and complement every neckline with timeless elegance
          </p>
        </div>
      </div>
    </section>
  );
}

// Earrings Section
function EarringsSection() {
  const earringItems = [
    { url: "/solevea-logo.png", name: "Diamond Studs", price: "$1,950" },
    { url: "/solevea-logo.png", name: "Pearl Drops", price: "$1,200" },
    { url: "/solevea-logo.png", name: "Hoop Earrings", price: "$890" },
    { url: "/solevea-logo.png", name: "Chandelier Style", price: "$2,400" },
    { url: "/solevea-logo.png", name: "Geometric Design", price: "$1,650" },
    { url: "/solevea-logo.png", name: "Vintage Inspired", price: "$1,850" },
  ];

  return (
    <section id="earrings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-amber-900 mb-4">Elegant Earrings</h2>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            From subtle studs to statement pieces, find earrings that perfectly frame your face
          </p>
        </div>
      </div>
    </section>
  );
}

// About Us Section
function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif text-amber-900 mb-6">Our Story</h2>
            <p className="text-lg text-amber-700 mb-6 leading-relaxed">
              Founded with a passion for timeless elegance, Solevea represents the perfect harmony between 
              traditional craftsmanship and contemporary design. Each piece in our collection is meticulously 
              handcrafted by master artisans who have dedicated their lives to the art of jewelry making.
            </p>
            <p className="text-lg text-amber-700 mb-6 leading-relaxed">
              We are committed to sustainability and ethical sourcing, ensuring that every gemstone and precious 
              metal in our collection meets the highest standards of responsibility and quality.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-serif text-amber-800 mb-2">25+</div>
                <div className="text-sm text-amber-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-amber-800 mb-2">10k+</div>
                <div className="text-sm text-amber-600">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=600&width=500&text=Artisan+Crafting"
              alt="Artisan crafting jewelry"
              width={500}
              height={600}
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-amber-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-amber-600">Testimonials from those who cherish our creations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The craftsmanship is absolutely extraordinary. My engagement ring from Solevea is not just jewelry, it's a work of art that I'll treasure forever.",
              author: "Sarah Mitchell",
              rating: 5
            },
            {
              quote: "I've never received so many compliments on a piece of jewelry. The attention to detail and quality is unmatched. Solevea has earned a customer for life.",
              author: "Emily Chen",
              rating: 5
            },
            {
              quote: "From the moment I walked into their boutique, I knew I was somewhere special. The personalized service and exquisite pieces make Solevea truly unique.",
              author: "Isabella Rodriguez",
              rating: 5
            }
          ].map((testimonial, index) => (
            <Card key={index} className="border-amber-100 hover:border-amber-200 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-amber-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <p className="text-amber-800 font-medium">— {testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-100 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-serif text-amber-900 mb-4">Stay Connected</h2>
        <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto">
          Be the first to discover our new collections, exclusive offers, and jewelry care tips
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-amber-200 focus:border-amber-400 bg-white/80"
          />
          <Button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 rounded-full">
            Subscribe
          </Button>
        </div>
        <p className="text-sm text-amber-600 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

// Footer Section
function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/favicon-32x32.png"
                alt="Solevea Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h3 className="text-2xl font-serif text-white">Solevea</h3>
            </div>
            <p className="text-amber-200 mb-6 max-w-md">
              Crafting timeless jewelry pieces that celebrate life's most precious moments with unparalleled elegance and quality.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-amber-200 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-amber-200 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-amber-200 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-amber-200 hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="#" className="text-amber-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-amber-200 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="text-amber-200 hover:text-white transition-colors">Care Instructions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-amber-300" />
                <span className="text-amber-200">hello@solevea.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-amber-300" />
                <span className="text-amber-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-amber-300" />
                <span className="text-amber-200">New York, NY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-300">
            &copy; {new Date().getFullYear()} Solevea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function SolveaApp() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NavBar items={navItems} />
      <Hero />
      <CollectionsSection />
      <RingsSection />
      <NecklacesSection />
      <EarringsSection />
      <AboutUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
