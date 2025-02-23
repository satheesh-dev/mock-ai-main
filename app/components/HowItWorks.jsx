import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../dashboard/_components/card";
import { UserPlus, Video, MessageSquare, BarChart } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-6 w-6 text-blue-600" />,
    title: "Sign Up",
    description: "Create your account and set your preferences.",
  },
  {
    icon: <Video className="h-6 w-6 text-green-600" />,
    title: "Start Interview",
    description: "Begin your AI-powered mock interview session.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-yellow-600" />,
    title: "Answer Questions",
    description: "Respond to tailored interview questions.",
  },
  {
    icon: <BarChart className="h-6 w-6 text-red-600" />,
    title: "Get Feedback",
    description: "Receive detailed feedback and performance analysis.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50"
    >
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {step.icon}
                <span>{step.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
