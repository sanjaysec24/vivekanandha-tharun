import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the router context state
interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    // Normalise any hash based links or query params
    window.history.pushState({}, '', to);
    setPath(to);
    
    // Scroll to top instantly when page changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

const ParamsContext = createContext<Record<string, string>>({});

export function useParams() {
  return useContext(ParamsContext);
}

export function matchRoutePath(routePath: string, currentPath: string): { matches: boolean; params: Record<string, string> } {
  if (routePath === currentPath) {
    return { matches: true, params: {} };
  }
  
  if (!routePath.includes(':')) {
    return { matches: false, params: {} };
  }

  const routeSegments = routePath.split('/');
  const currentSegments = currentPath.split('/');

  if (routeSegments.length !== currentSegments.length) {
    return { matches: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSeg = routeSegments[i];
    const currentSeg = currentSegments[i];

    if (routeSeg.startsWith(':')) {
      const paramName = routeSeg.slice(1);
      params[paramName] = decodeURIComponent(currentSeg);
    } else if (routeSeg !== currentSeg) {
      return { matches: false, params: {} };
    }
  }

  return { matches: true, params };
}

interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export function Route({ path, element }: RouteProps) {
  const { path: currentPath } = useRouter();
  const { matches, params } = matchRoutePath(path, currentPath);
  
  if (matches) {
    return (
      <ParamsContext.Provider value={params}>
        {element}
      </ParamsContext.Provider>
    );
  }
  return null;
}

interface LinkProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  id?: string;
  [key: string]: any;
}

export function Link({ to, children, className, onClick, ...props }: LinkProps) {
  const { navigate, path: currentPath } = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    // If it's an external link or has modifiers, allow default behavior
    if (to.startsWith('http') || e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  // Determine if active
  const isActive = currentPath === to;
  const combinedClassName = `${className || ''} ${isActive ? 'nav-link-active' : ''}`.trim();

  return (
    <a href={to} onClick={handleClick} className={combinedClassName} {...props}>
      {children}
    </a>
  );
}
