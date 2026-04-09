import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-xl tracking-widest font-semibold uppercase text-primary">
          R C Patel
        </div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wider font-medium text-foreground/70">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#services" className="hover:text-primary transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <Button variant="outline" className="hidden md:inline-flex rounded-none border-primary/20 hover:bg-primary/5 uppercase tracking-widest text-xs" asChild>
          <a href="#contact">Inquire Now</a>
        </Button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.png" 
          alt="Luxurious Minimal Living Room" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container relative z-10 px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.3em] mb-6 text-white/80">Interior Design Studio</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 max-w-4xl mx-auto leading-tight">
            Where Precision Meets <span className="italic text-primary-foreground/90">Warmth</span>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-xl mx-auto mb-10 text-white/80 leading-relaxed">
            Transforming raw spaces into refined living environments across Gujarat. Understated confidence, craftsmanship, and trust.
          </p>
          <Button size="lg" className="rounded-none bg-primary hover:bg-primary/90 text-white px-8 py-6 text-sm uppercase tracking-widest" asChild>
            <a href="#portfolio">Explore Our Work</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6">Crafting Spaces with Intent.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At R C Patel Interior, we believe that a space should feel as good as it looks. Based in Gujarat, we specialize in residential and commercial interiors that balance aesthetic restraint with inviting warmth.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We approach every project like a model apartment—calm, polished, and aspirational. From conceptual space planning to turnkey execution, we handle every detail so you can simply step into your dream environment.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 uppercase tracking-widest text-sm group" asChild>
              <a href="#services" className="flex items-center gap-2">
                Our Services <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
          <motion.div 
            className="relative h-[600px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/images/about-details.png" 
              alt="Design details and craftsmanship" 
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Space Planning",
    desc: "Strategic layouts that maximize flow, functionality, and natural light in your property."
  },
  {
    title: "Turnkey Interiors",
    desc: "End-to-end execution from concept to handover. We manage contractors, materials, and timelines."
  },
  {
    title: "Modular Kitchens",
    desc: "Sleek, highly functional cooking spaces tailored to your culinary habits and aesthetic preferences."
  },
  {
    title: "Furniture Selection",
    desc: "Curated pieces that complement the architecture, prioritizing comfort and timeless design."
  }
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Expertise</span>
          <h2 className="text-3xl md:text-5xl font-light mb-6">Comprehensive Design Solutions</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background p-8 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-xl font-medium mb-4">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const items = [
    { img: "/images/portfolio-1.png", title: "Serene Residences", category: "Residential" },
    { img: "/images/portfolio-2.png", title: "Modern Culinary Spaces", category: "Kitchen" },
    { img: "/images/portfolio-3.png", title: "The Terracotta Lounge", category: "Living" },
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Selected Works</span>
            <h2 className="text-3xl md:text-5xl font-light">Featured Projects</h2>
          </div>
          <Button variant="outline" className="rounded-none mt-6 md:mt-0 hidden md:inline-flex">
            View All Projects
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden relative aspect-[4/5] mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur text-black px-6 py-3 rounded-full text-sm uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Project
                  </div>
                </div>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{item.category}</p>
              <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Consultation", desc: "Understanding your vision, lifestyle, and spatial requirements." },
    { num: "02", title: "Concept & Design", desc: "Developing layouts, material palettes, and 3D visualizations." },
    { num: "03", title: "Execution", desc: "Bringing the design to life with meticulous craftsmanship." },
    { num: "04", title: "Handover", desc: "Delivering a spotless, ready-to-live sophisticated space." }
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light">How We Work</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-primary-foreground/20" />
          {steps.map((step, i) => (
            <div key={i} className="relative pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-background text-primary flex items-center justify-center text-xl font-light mb-6 mx-auto md:mx-0 relative z-10 shadow-lg">
                {step.num}
              </div>
              <h3 className="text-xl font-medium mb-3 text-center md:text-left">{step.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed text-center md:text-left">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Get in touch</span>
            <h2 className="text-3xl md:text-5xl font-light mb-8">Let's create something beautiful together.</h2>
            <p className="text-muted-foreground mb-12 max-w-md">
              Whether you are looking to redesign a single room or build a turnkey commercial space, we are here to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Studio Location</p>
                  <p className="text-sm text-muted-foreground">Gujarat, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">hello@rcpatelinterior.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 p-8 md:p-12 border border-border/50">
            <h3 className="text-2xl font-light mb-8">Project Enquiry</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
                  <input type="tel" className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors" placeholder="Your Number" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Project Type</label>
                <select className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option value="">Select an option...</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="kitchen">Modular Kitchen</option>
                  <option value="turnkey">Turnkey Solutions</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-border py-2 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <Button type="submit" className="w-full rounded-none bg-primary hover:bg-primary/90 text-white h-14 uppercase tracking-widest text-sm mt-4">
                Send Enquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="text-2xl tracking-widest font-semibold uppercase text-primary mb-4">
              R C Patel
            </div>
            <p className="text-background/60 max-w-sm text-sm leading-relaxed">
              Transforming raw spaces into refined living environments. Serving residential and commercial clients across Gujarat, India.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between text-xs text-background/40 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} R C Patel Interior. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  return (
    <a 
      href="https://wa.me/919876543210" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
