import PublicLayout from "@/components/PublicLayout";
import Providers from "./providers";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <PublicLayout>{children}</PublicLayout>
        </Providers>
    );
}
