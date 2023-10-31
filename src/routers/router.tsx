import { lazy } from 'react';
import { routes } from './routerPath';
import { useRoutes } from 'react-router-dom';
import NetworkError from 'pages/NetworkError';

const Demo = lazy(() =>
  import('pages/demo').catch(() => {
    return { default: NetworkError };
  }),
);
export default function Routers(props: any) {
  const elements = useRoutes([
    {
      path: routes.demo,
      element: <Demo {...props} />,
    },
  ]);
  return elements;
}
