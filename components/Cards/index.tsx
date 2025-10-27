import Card from "@/components/Card";

type Props = {
    className?: string;
    isColumn?: boolean;
    items: {
        title: string;
        value: string;
        percentage: number;
        image: string;
        tooltip: string;
    }[];
};

const Cards = ({ className, isColumn, items }: Props) => {
    // Não renderizar se não há itens
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div
            className={`flex gap-6 mt-6 max-md:flex-col max-md:gap-4 ${
                isColumn ? "flex-col max-md:gap-4" : ""
            } ${className || ""} ${
                items.length > 3
                    ? "max-lg:flex-wrap max-lg:gap-0 max-lg:-mt-6 max-lg:-mx-3 max-md:flex-col max-md:!gap-0 max-md:-mt-4 max-md:mx-0"
                    : ""
            }`}
        >
            {items.map((stat, index) => (
                <Card
                    className={`flex-1 ${
                        items.length > 3
                            ? "max-lg:w-[calc(50%-1.5rem)] max-lg:flex-auto max-lg:mt-6 max-lg:mx-3 max-md:w-full max-md:mt-4 max-md:mx-0"
                            : ""
                    }`}
                    item={stat}
                    key={index}
                />
            ))}
        </div>
    );
};

export default Cards;
