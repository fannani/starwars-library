import { atom } from 'jotai';
import update from 'immutability-helper';

export const activeMenuAtom = atom<string>('/');

export type BreadcrumbValueType = {
  href?: string;
  caption: string;
};

type BreadcrumbArgsType = {
  value: BreadcrumbValueType;
  index: number;
};

export const allBreadcrumbAtom = atom<BreadcrumbValueType[]>([]);

export const breadcrumbAtom = atom(
  (get) => get(allBreadcrumbAtom),
  (get, set, value: BreadcrumbArgsType) => {
    set(
      allBreadcrumbAtom,
      update(get(allBreadcrumbAtom), {
        [value.index]: { $set: value.value },
      })
    );
  }
);
