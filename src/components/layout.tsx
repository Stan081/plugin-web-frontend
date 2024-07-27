import { ComponentPropsWithRef, FC, useEffect } from "react";
import Meta from "./Meta";
import Footer from "./Footer";

interface LayoutProps extends ComponentPropsWithRef<"div"> {
    title: string;
    description?: string;
    canonical?: string;
    image?: string;
    showHeader?: boolean;
    showFooter?: boolean;
    showAnnouncement?: boolean;
}

const Layout: FC<LayoutProps> = ({
    title,
    description,
    children,
    canonical,
    image,
    showHeader = true,
    showFooter = true,
    ...rest
}) => {
    return (
        <>
            <Meta
                title={title}
                description={description}
                canonical={canonical}
                image={image}
            />
            {showHeader && ""}
            <main {...rest}>{children}</main>
            {showFooter && <Footer/>}
        </>
    );
};

export default Layout;