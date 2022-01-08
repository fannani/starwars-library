import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SetStateAction, useAtom } from 'jotai';
import {
  activeMenuAtom,
  allBreadcrumbAtom,
  breadcrumbAtom,
  BreadcrumbValueType,
} from 'states';

type Breadcrumb = {
  caption: string;
  href?: string;
};

type SettingsProps = {
  activeMenu?: string;
  breadcrumb?: Breadcrumb[];
};

type Settings = (props?: SettingsProps) => {
  setBreadcrumb: (index: number, value: Breadcrumb) => void;
  setActiveMenu: (update: SetStateAction<string>) => void;
};

export const useSettings: Settings = ({ activeMenu, breadcrumb = [] } = {}) => {
  const [, setActiveMenu] = useAtom(activeMenuAtom);
  const [, setBreadcrumbValue] = useAtom(breadcrumbAtom);
  const [, setAllBreadcrumb] = useAtom(allBreadcrumbAtom);
  const { pathname } = useRouter();
  const setBreadcrumb = (index: number, value: BreadcrumbValueType) =>
    setBreadcrumbValue({
      index,
      value,
    });

  useEffect(() => {
    const pathnames = pathname.split('/');
    const filterPaths: string[] = [];
    for (const path of pathnames) {
      if (path[0] === '[') break;
      filterPaths.push(path);
    }
    setActiveMenu(activeMenu ?? filterPaths.join('/'));
    setAllBreadcrumb(breadcrumb);
  }, []);

  return {
    setBreadcrumb,
    breadcrumb,
    activeMenu,
    setActiveMenu,
  };
};
