"use client";

import { cn } from "@/utils/classNames";
import Image from "next/image";
import React from "react";

interface GameCardProps {
    image: string;
    title: string;
    logo: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const GameCard = ({ image, title, logo, className, onClick, disabled }: GameCardProps) => {
    return (
        <div
            className={cn("relative cursor-pointer", disabled && "opacity-50 pointer-events-none", className)}
            onClick={onClick}
        >
            <div
                className={cn(
                    "group bg-[#b8860b] relative p-0.75 overflow-hidden isolate",
                    "before:content-[''] before:absolute before:-z-10 before:-inset-0.75",
                    "before:bg-[conic-gradient(from_0deg,#b8860b,gold,#fff3a3,gold,#b8860b)]",
                    "before:animate-rotate-border",
                    "after:content-[''] after:absolute after:z-0 after:inset-0.5",
                    "after:bg-black after:rounded-[10px]"
                )}
            >
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={300}
                    className="relative z-10 h-full w-full object-cover rounded-[10px]"
                />
                <div
                    className={cn(
                        "pointer-events-none absolute inset-0 z-15 flex items-center justify-center",
                        "bg-[#0009] opacity-0 transition-opacity duration-300",
                        "group-hover:opacity-100"
                    )}
                >
                    <div
                        className={cn(
                            "absolute top-[15%] left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5",
                            "opacity-0 transition-opacity delay-0 duration-300",
                            "group-hover:opacity-100 group-hover:delay-400"
                        )}
                    >
                        <Image
                            src={logo}
                            alt={title}
                            width={300}
                            height={300}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div
                        className={cn(
                            "absolute top-1/2 left-1/2 w-1/5 -translate-x-1/2 -translate-y-1/2",
                            "opacity-0 transition-opacity delay-0 duration-300",
                            "group-hover:opacity-100 group-hover:delay-600"
                        )}
                    >
                        <Image
                            src={"/images/play.webp"}
                            alt="play"
                            width={300}
                            height={300}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <h3
                    className={cn(
                        "absolute bottom-0 left-0 z-20 w-full bg-[#00000057] py-3 text-center text-lg text-white",
                        "translate-y-0 transition-transform duration-300 ease-out",
                        "group-hover:translate-y-full"
                    )}
                >
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default GameCard