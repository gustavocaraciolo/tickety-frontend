import Icon from "@/components/Icon";

interface TooltipProps {
    className?: string;
    content: string;
    place?: string;
    children?: React.ReactNode;
}

const Tooltip = ({
    className,
    content,
    place = "right",
    children,
}: TooltipProps) => {
    // Não renderizar se não há conteúdo
    if (!content) {
        return null;
    }

    return (
        <div
            className={`flex fill-gray-300 transition-color cursor-pointer hover:fill-gray-900 ${
                className || ""
            }`}
            title={content}
        >
            {children || (
                <Icon
                    className="fill-inherit transition-colors"
                    name="info"
                />
            )}
        </div>
    );
};

export default Tooltip;
