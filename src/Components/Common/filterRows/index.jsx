import Loadable from 'react-loadable';

export const Active = Loadable({
    loader: () => import('./Active'),
    loading: () => null
});

export const Date = Loadable({
    loader: () => import('./Date'),
    loading: () => null
});

export const DateTime = Loadable({
    loader: () => import('./DateTime'),
    loading: () => null
});