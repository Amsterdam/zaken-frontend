import { Routes } from 'app/routing/routes';

const toSteps = (s: string) => s.split('/').filter((_) => _ !== '');

const isRoute = (route: string, path: string) => {
  const r = toSteps(route);
  const p = toSteps(path);
  if (r.length !== p.length) return false;
  return r.reduce((acc, step, index) => {
    if (acc === false) return false;
    if (step.substring(0, 1) === ':') return true;
    if (step === p[index]) return true;
    return false;
  }, true);
};

export default (routes: Routes, path: string) => Object.keys(routes).find((route) => isRoute(route, path));
