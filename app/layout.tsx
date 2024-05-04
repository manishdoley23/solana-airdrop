import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
// import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { Bounce, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body
                className={clsx(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <div className="relative flex flex-col h-screen">
                    {/* <Navbar /> */}
                    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                        <ToastContainer
                            position="bottom-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                            transition={Bounce}
                        />
                        {children}
                    </main>
                    <footer className="w-full flex items-center justify-center py-3"></footer>
                </div>
            </body>
        </html>
    );
}
