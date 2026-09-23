import {
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import type { Feedback } from "@/types/analysis";

type Props = Feedback;

export default function FeedbackCard({
    strengths,
    improvements,
}: Props) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
            <div>
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-green-600">
                    <CheckCircle size={22} />
                    Strengths
                </h2>

                <ul className="space-y-2">
                    {strengths.map((item) => (
                        <li key={item}>✅ {item}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-yellow-600">
                    <AlertTriangle size={22} />
                    Improvements
                </h2>

                <ul className="space-y-2">
                    {improvements.map((item) => (
                        <li key={item}>⚠️ {item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}