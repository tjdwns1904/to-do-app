import React, { lazy, Suspense, useEffect, useRef, useState } from "react";

interface Props<T = any> {
  component: () => Promise<{ default: React.ComponentType<any> }>;
  skeleton: React.ReactNode;
  height: number;
  margin?: number;
  props: T;
}

function LazyComponent({
  component,
  skeleton,
  height,
  margin = 0,
  props,
}: Props) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [LoadedComponent, setLoadedComponent] =
    useState<React.LazyExoticComponent<any> | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !LoadedComponent) {
      setLoadedComponent(lazy(component));
    }
  }, [isVisible, component, LoadedComponent]);
  return (
    <div
      className="row mb-(--margin) h-(--height)"
      ref={containerRef}
      style={
        {
          "--height": height + "px",
          "--margin": margin + "px",
        } as React.CSSProperties
      }
    >
      {isVisible && LoadedComponent ? (
        <Suspense fallback={skeleton}>
          <LoadedComponent {...props} />
        </Suspense>
      ) : (
        skeleton
      )}
    </div>
  );
}

export default LazyComponent;
