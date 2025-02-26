import { Card, CardContent } from "@/components/ui/card";
import { Users2, Award, ShieldCheck, Smile } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About ShopSmart</h1>
        <p className="text-lg text-muted-foreground">
          We're dedicated to bringing you the finest selection of home furnishings
          and decor, making your space uniquely yours.
        </p>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <ShieldCheck className="h-8 w-8" />,
            title: "Quality Assurance",
            description:
              "Every product undergoes rigorous quality checks to ensure the highest standards.",
          },
          {
            icon: <Award className="h-8 w-8" />,
            title: "Best Prices",
            description:
              "We negotiate with suppliers to bring you competitive prices without compromising quality.",
          },
          {
            icon: <Users2 className="h-8 w-8" />,
            title: "Customer First",
            description:
              "Our dedicated support team is here to help you make the right choices for your home.",
          },
          {
            icon: <Smile className="h-8 w-8" />,
            title: "Satisfaction Guaranteed",
            description:
              "Not happy with your purchase? Our hassle-free return policy has got you covered.",
          },
        ].map((value, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, ShopSmart emerged from a simple vision: to make
              high-quality home furnishings accessible to everyone.
            </p>
            <p>
              What started as a small online store has grown into a trusted
              destination for homeowners and interior design enthusiasts alike.
            </p>
            <p>
              Today, we continue to expand our collection while maintaining our
              commitment to quality, sustainability, and customer satisfaction.
            </p>
          </div>
        </div>
        <div className="aspect-video bg-gradient-to-r from-primary/20 to-primary rounded-lg" />
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-muted p-8 rounded-lg">
        {[
          { label: "Happy Customers", value: "10,000+" },
          { label: "Products", value: "500+" },
          { label: "Cities Served", value: "50+" },
          { label: "Years of Service", value: "3+" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
