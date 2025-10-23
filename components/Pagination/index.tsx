import Button from "@/components/Button";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex gap-2">
            <Button
                className="!shadow-none max-md:[&_svg]:fill-gray-900"
                icon="chevron"
                isSecondary
                isSmall
                isSquare
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            />
            <div className="flex border border-gray-100 rounded-lg overflow-hidden max-md:hidden">
                {pageNumbers.map((number, index) => (
                    <button
                        className={`size-7.5 text-body-sm font-medium not-last:border-r not-last:border-gray-100 transition-colors hover:bg-gray-25 ${
                            number === currentPage ? "!bg-primary-500 !text-white" : ""
                        }`}
                        key={index}
                        onClick={() => typeof number === 'number' && onPageChange(number)}
                        disabled={number === '...'}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <div className="hidden justify-center items-center min-w-14 px-3 border border-gray-100 rounded-lg text-body-sm font-medium text-gray-500 max-md:flex">
                <span className="text-gray-900">{currentPage}</span>/{totalPages}
            </div>
            <Button
                className="rotate-180 !shadow-none max-md:[&_svg]:fill-gray-900"
                icon="chevron"
                isSecondary
                isSmall
                isSquare
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </div>
    );
};

export default Pagination;
