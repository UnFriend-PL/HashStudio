import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import I18nProvider from "./I18nProvider";
import { ChatProvider } from "./context/ChatContext";
import Analytics from "./components/analytics/GoogleAnalytics";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "HashStudio",
    description: "Digital Design & Development Studio",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <I18nProvider>
                <ChatProvider>
                    {children}
                </ChatProvider>
            </I18nProvider>
            <Analytics />
        </body>
        </html>
    );
}
