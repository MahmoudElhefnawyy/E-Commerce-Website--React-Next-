import { Card, CardContent } from "@/components/ui/card";
import { Users2, Award, ShieldCheck, Smile } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">About ShopSmart</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We're dedicated to bringing you the finest selection of home furnishings
          and decor, making your space uniquely yours with modern design and quality craftsmanship.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users2, title: "Customer Focus", text: "Putting our customers first in everything we do" },
          { icon: Award, title: "Quality Products", text: "Carefully curated selection of premium items" },
          { icon: ShieldCheck, title: "Secure Shopping", text: "Safe and protected transactions" },
          { icon: Smile, title: "Satisfaction", text: "100% satisfaction guaranteed on all purchases" }
        ].map((feature, i) => (
          <Card key={i} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-muted/50 backdrop-blur-sm p-8 rounded-2xl">
        {[
          { label: "Happy Customers", value: "10,000+" },
          { label: "Products", value: "500+" },
          { label: "Cities Served", value: "50+" },
          { label: "Years of Service", value: "3+" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{stat.value}</p>
            <p className="text-sm font-medium text-muted-foreground mt-2">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}