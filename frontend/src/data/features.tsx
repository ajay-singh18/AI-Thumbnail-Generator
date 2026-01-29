import { Zap } from "lucide-react";
import { Shapes } from "lucide-react";
import { Sparkles } from "lucide-react";



import type { IFeature } from "../types";

export const featuresData: IFeature[] = [
    {
        // icon: "/assets/zap-icon.svg",
        icon: <Zap className="w-7 h-7 text-purple-600"/>,
        title: "AI-Powered Analysis",
        description: "Our AI understands your content and suggests high-click thumbnail ideas automatically.",
    },
    {
        // icon: "/assets/thumb-icon.svg",
        icon: <Shapes className="w-7 h-7 text-purple-600"/>,

        title: "Eye-catching Designs",
        description: "Generate vibrant, high-contrast thumbnails that stand out in the feed.",
    },
    {
        // icon: "/assets/shape-icon.svg",
        icon: <Sparkles className="w-7 h-7 text-purple-600"/>,

        title: "Fully Customizable",
        description: "Fine-tune every detail with fully editable, layered designs.",
    },
    
];