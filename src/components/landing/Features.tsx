import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Fast Ticket Resolution",
    description: "Create, assign, and track tickets in seconds with our intuitive interface.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Insightful Analytics",
    description: "Gain valuable insights with a dashboard summarizing your support performance.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Secure & Reliable",
    description: "Your data is safe with our robust security and reliable infrastructure.",
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute -top-16 left-0 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl -z-10 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-16 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl -z-10 animate-blob animation-delay-2000"></div>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why TicketHub?</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Everything you need to deliver exceptional customer support.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
              <CardHeader className="pt-8">
                <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">{feature.icon}</div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
