"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface LottieDisplayProps {
    url: string;
}

export default function LottieDisplay({ url }: LottieDisplayProps) {
    const [animationData, setAnimationData] = useState<unknown>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url) return;

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to load Lottie JSON");
                return response.json();
            })
            .then((data) => setAnimationData(data))
            .catch((err) => {
                console.error("Error loading Lottie animation:", err);
                setError(true);
            });
    }, [url]);

    if (error || !animationData) return null;

    return (
        <div className="w-full mx-auto my-8 sm:my-12 rounded-xl overflow-hidden">
            <Lottie animationData={animationData} loop={true} className="w-full h-auto" />
        </div>
    );
}
