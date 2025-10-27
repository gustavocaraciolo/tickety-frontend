import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

type PublicLayoutProps = {
    children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicHeader />
            <main className="flex-1">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
