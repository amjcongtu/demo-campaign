import { Suspense } from "react";
import Routers from "routers/router";
import { routes } from "routers/routerPath";

export const App = () => {
  const getPropsById = (pathName: string) => {
    switch (pathName) {
      case routes.demo:
        return {};
      default:
        return {};
    }
  };
  return (
    <Suspense>
      <Routers {...getPropsById(location.pathname)} />
    </Suspense>
  );
};
