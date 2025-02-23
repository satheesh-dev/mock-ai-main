import { User, User2Icon, UserCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/_components/card";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    quote:
      "AI Mock helped me land my dream job at a top tech company. The feedback was invaluable!",
    image: <UserCircleIcon size={50} className="text-blue-500" />,
  },
  {
    name: "Michael Chen",
    role: "Marketing Manager",
    quote:
      "The tailored questions and real-time feedback significantly boosted my confidence.",
    image: <User2Icon size={50} className="text-green-500" />,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    quote:
      "I was amazed by how accurately the AI simulated real interview scenarios. Highly recommended!",
    image: <User size={50} className="text-purple-500" />,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {typeof testimonial.image === "string" ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className="flex justify-center items-center rounded-full bg-gray-200"
                    style={{ width: "50px", height: "50px" }}
                  >
                    {testimonial.image} {/* Render the User icon here */}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
