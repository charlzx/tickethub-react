
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

function WavyBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 w-full overflow-hidden z-0">
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full h-auto"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "scaleX(-1)" }}
      >
        <path
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          className="fill-background"
        ></path>
      </svg>
    </div>
  );
}

export default function Hero() {
  const { user } = useAuth();
  
  return (
    <section className="relative bg-background w-full overflow-hidden">
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Streamline Your Support with <span className="text-primary">TicketHub</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The all-in-one platform to manage customer queries, track issues, and collaborate with your team efficiently. Stop juggling, start resolving.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={user ? "/dashboard" : "/login"}>
                {user ? "Go to Dashboard" : "Login"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <WavyBackground />
    </section>
  );
}
