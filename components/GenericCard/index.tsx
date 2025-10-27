import React, { ReactNode } from "react";

interface GenericCardProps {
    className?: string;
    children: ReactNode;
}

const GenericCard = ({ className, children }: GenericCardProps) => {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className || ""}`}>
            {children}
        </div>
    );
};

export default GenericCard;
