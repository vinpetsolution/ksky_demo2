"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";
import { IoClose } from "react-icons/io5";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: React.ReactNode | string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    /** Nhãn cho dialog (a11y). Nên set khi không có tiêu đề visible. */
    "aria-label"?: string;
    footer?: React.ReactNode;
    positionFooter?: "start" | "end" | "center";
    contentClassName?: string;
    headerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    className = "",
    title,
    showCloseButton = true,
    closeOnOverlayClick = true,
    "aria-label": ariaLabel,
    footer,
    positionFooter = "end",
    contentClassName = "",
    headerClassName = "",
}) => {
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const handleOverlayClick = useCallback(() => {
        if (closeOnOverlayClick) onClose();
    }, [closeOnOverlayClick, onClose]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCloseRef.current();
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    // if (!open) return null;
    if (typeof document === "undefined") return null;

    const hasHeader = title != null && title !== "";

    const dialog = (
        <div

            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className={cn(
                "fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
            )}
            onClick={handleOverlayClick}
        >
            <div
                className="relative"
            >


                {showCloseButton ? (
                    <Button
                        onClick={onClose}
                        className={cn("size-9 absolute top-2 right-2 z-10 rounded-full",
                            "text-[#d7c08a] bg-[#140f08d1] border border-[#caa24a4d]",
                            "hover:text-[#f3c74a] hover:border-[#f3c74a80]",
                            "transition-all duration-300"
                        )}
                        variant="transparent"
                        aria-label="Close"
                    >
                        <IoClose className="size-4" aria-hidden />
                    </Button>
                ) : null}



                <div
                    className={cn(
                        "relative min-w-[300px] max-w-[95vw] max-h-[90vh] rounded-xl shadow-2xl bg-[linear-gradient(180deg,#140f08,#0c0905)]",
                        "flex flex-col overflow-hidden border border-[#caa24a40]",
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {hasHeader && (
                        <div className={cn("flex items-center justify-center border-b relative",
                            "px-4 py-3 shrink-0  border-[#caa24a40]",
                            headerClassName)}>
                            {typeof title === "string" ? (
                                <h2 className="min-w-0 flex-1 truncate text-base text-center font-bold text-[#efe4c8] md:text-lg">{title}</h2>
                            ) : (
                                title
                            )}
                        </div>
                    )}
                    <div className={cn("flex-1 scrollbar", contentClassName)}>{children}</div>

                    {/* Footer */}
                    {footer && (
                        <div className={cn("flex items-center justify-end border-t border-gray/30",
                            positionFooter === "start" && "justify-start", positionFooter === "center" && "justify-center",
                            "gap-3 px-4 lg:px-8 py-2 lg:py-4 shrink-0")}>
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(
        open && dialog,
        document.body
    );
}

export default Modal;