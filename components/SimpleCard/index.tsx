import { ReactNode } from "react";

interface SimpleCardProps {
    className?: string;
    children: ReactNode;
}

const SimpleCard = ({ className, children }: SimpleCardProps) => {
    return (
        <div className={`border border-gray-200 rounded-lg shadow-sm bg-white ${className || ""}`}>
            {children}
        </div>
    );
};

export default SimpleCard;
