import {
  ComponentPropsWithRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import Meta from "./Meta";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./page-components/user-dashboard/Sidebar";

interface LayoutProps extends ComponentPropsWithRef<"div"> {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  showAnnouncement?: boolean;
  showSidebar?: boolean;
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
  canonical,
  image,
  showHeader,
  showFooter,
  showSidebar,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);
  return (
    <>
      <Meta
        title={title}
        description={description}
        canonical={canonical}
        image={image}
      />
      {showHeader && <Header />}
      <main {...rest} className="flex">
        {showSidebar && <Sidebar open={open} toggle={toggle} />}
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
