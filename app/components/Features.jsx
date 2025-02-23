import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/_components/card";
import { Lightbulb, MessageCircle, Target } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="h-6 w-6 text-blue-600" />,
    title: "AI-Powered Insights",
    description:
      "Get detailed feedback on your performance, powered by advanced AI algorithms.",
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-green-600" />,
    title: "Real-Time Feedback",
    description:
      "Receive instant feedback on your answers, body language, and tone of voice.",
  },
  {
    icon: <Target className="h-6 w-6 text-red-600" />,
    title: "Tailored Interview Questions",
    description:
      "Practice with questions specific to your industry and experience level.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {feature.icon}
                <span>{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
