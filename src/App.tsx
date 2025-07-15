import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  BookOpen,
  Users,
  Zap,
  Github,
  Twitter,
  Facebook,
  Youtube,
  Menu,
  X,
  Star,
} from "lucide-react";
import AnimatedEagle from "./components/AnimatedEagle";

interface StarProps {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  direction: number;
  rotationSpeed: number;
}

const AnimatedStars: React.FC = () => {
  const [stars, setStars] = useState<StarProps[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: StarProps[] = [];
      for (let i = 0; i < 80; i++) {
        const direction = Math.random() * Math.PI * 2; // Random direction in radians
        const speed = Math.random() * 0.8 + 0.2; // Base speed
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: Math.cos(direction) * speed,
          speedY: Math.sin(direction) * speed,
          opacity: Math.random() * 0.5 + 0.1,
          direction,
          rotationSpeed: (Math.random() - 0.5) * 0.02, // Random rotation
        });
      }
      setStars(newStars);
    };

    generateStars();

    const animateStars = () => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          x: star.x + star.speedX * 0.3, // Slowed down by 70%
          y: star.y + star.speedY * 0.3, // Slowed down by 70%
          direction: star.direction + star.rotationSpeed,
          speedX:
            star.x > window.innerWidth + 10
              ? -Math.abs(star.speedX)
              : star.x < -10
              ? Math.abs(star.speedX)
              : star.speedX + Math.sin(star.direction) * 0.005, // Reduced influence
          speedY:
            star.y > window.innerHeight + 10
              ? -Math.abs(star.speedY)
              : star.y < -10
              ? Math.abs(star.speedY)
              : star.speedY + Math.cos(star.direction) * 0.005, // Reduced influence
        }))
      );
    };

    const interval = setInterval(animateStars, 80); // Slower update rate
    const handleResize = () => generateStars();

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, ${
              star.opacity * 0.3
            })`,
            transform: `rotate(${star.direction}rad)`,
            animation: `twinkle ${
              2 + Math.random() * 3
            }s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

const Header: React.FC = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-lg border-b border-teal-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              THE EAGLES.IO
            </h1>
          </div>

          {/* <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 border border-teal-400/30">
              Register
            </button>
          </div> */}
{/* 
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button> */}
        </div>

        {/* {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in-down">
            <button className="block w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 border border-teal-400/30">
              Register
            </button>
          </div>
        )} */}
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Central Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-teal-400 to-cyan-400 bg-clip-text text-transparent flex items-center justify-center gap-4">
            <span>THE EAGLES.IO</span>
            <AnimatedEagle />
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            A decentralized networking platform based on{" "}
            <span className="text-teal-400 font-semibold">smart contracts</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button className="group bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25 animate-bounce-subtle">
            Sign In
          </button>
          <button className="group bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600  text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 animate-bounce-subtle animation-delay-200">
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

const School: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-lg border border-teal-500/20 rounded-2xl p-8 shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 animate-slide-in-right">
          <p className="text-gray-300 mb-6">
            The Eagles School is an exclusive training course designed
            specifically for the elite who want to unlock their full potential
            with The Eagles.io!
          </p>
          <button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 animate-pulse-slow">
            Go to School
          </button>
        </div>
      </div>
    </section>
  );
};

const Activity: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Platform Recent Activity
        </h3>
        <p className="text-gray-300 text-center mb-12">
          Real-time global event of the The Eagles.io Platform
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-teal-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 animate-slide-in-up animation-delay-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-teal-400 animate-bounce-gentle" />
              <span className="text-teal-400 font-bold animate-number-count">
                +422
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">New Members</h4>
            <p className="text-gray-400 text-sm">Joined in the last 24 hours</p>
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-teal-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 animate-slide-in-up animation-delay-200">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-cyan-400 animate-spin-slow" />
              <span className="text-cyan-400 font-bold animate-number-count">
                +1,284
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">Transactions</h4>
            <p className="text-gray-400 text-sm">Smart contract executions</p>
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-teal-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 animate-slide-in-up animation-delay-300">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-purple-400 animate-twinkle" />
              <span className="text-purple-400 font-bold animate-number-count">
                98%
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">Success Rate</h4>
            <p className="text-gray-400 text-sm">Platform reliability</p>
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-teal-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 animate-slide-in-up animation-delay-400">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-emerald-400 animate-float" />
              <span className="text-emerald-400 font-bold animate-number-count">
                156
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">Active Learners</h4>
            <p className="text-gray-400 text-sm">Currently in training</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-teal-500/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">The Eagles.io</h4>
            <p className="text-gray-400">
              Decentralized networking platform for the future of finance
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Official Channels</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Github className="w-6 h-6 hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Twitter className="w-6 h-6 hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Facebook className="w-6 h-6 hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Youtube className="w-6 h-6 hover:animate-bounce" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <p className="text-gray-400">The Eagles.io Support</p>
          </div>
        </div>

        <div className="border-t border-teal-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 All Rights Reserved - The Eagles.io
          </p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <AnimatedStars />
      <Header />
      <Hero />
      <School />
      <Activity />
      <Footer />
    </div>
  );
}

export default App;
