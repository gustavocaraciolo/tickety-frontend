import { ReactNode } from "react";

interface SimpleCardProps {
    className?: string;
    children: ReactNode;
}

const SimpleCard = ({ className, children }: SimpleCardProps) => {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className || ""}`}>
            {children}
        </div>
    );
};

export default SimpleCard;
