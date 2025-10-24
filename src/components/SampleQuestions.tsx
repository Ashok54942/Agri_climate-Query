import { Card } from "@/components/ui/card";
import { Sprout, CloudRain, TrendingUp, FileText } from "lucide-react";

interface SampleQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

const sampleQuestions = [
  {
    icon: CloudRain,
    title: "Climate Comparison",
    question: "Compare the average annual rainfall in Maharashtra and Punjab for the last 5 years.",
    color: "text-blue-600"
  },
  {
    icon: Sprout,
    title: "Crop Production",
    question: "What are the top 5 most produced crops in Karnataka in 2023?",
    color: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    question: "Analyze the wheat production trend in North India over the last decade and its correlation with rainfall patterns.",
    color: "text-orange-600"
  },
  {
    icon: FileText,
    title: "Policy Insights",
    question: "What data supports promoting rice cultivation over wheat in coastal regions based on climate patterns?",
    color: "text-purple-600"
  }
];

export const SampleQuestions = ({ onSelectQuestion }: SampleQuestionsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Try asking:</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {sampleQuestions.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="cursor-pointer p-4 transition-all hover:shadow-md hover:scale-[1.02]"
              onClick={() => onSelectQuestion(item.question)}
            >
              <div className="flex gap-3">
                <Icon className={`h-5 w-5 shrink-0 ${item.color}`} />
                <div className="space-y-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.question}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
