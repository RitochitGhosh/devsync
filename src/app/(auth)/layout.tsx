import "../globals.css";

interface AuthProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthProps) {
    return (
        <>
            {children}
        </>
    );
}