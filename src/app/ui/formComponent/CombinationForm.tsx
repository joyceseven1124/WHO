'use client';
import { useAppSelector, useAppStore } from '@/src/lib/hooks';
import { useRef } from 'react';
import PortfolioEditCardList from './list/PortfolioEditCardList'; // @preserve

export default function CombinationForm() {
  const store = useAppStore();
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   initialized.current = true;
  // }

  const formList = useAppSelector((state) => state.FormData.formData);
  const formListRender = Object.keys(formList).map((key: string) => {
    const CurrentElement = formList[key];
    const ComponentToRender =
      CurrentElement.componentType === 'PortfolioEditCardList'
        ? PortfolioEditCardList
        : null;

    if (ComponentToRender) {
      return (
        <fieldset key={key} className={key}>
          <ComponentToRender nodeKey={key} />
        </fieldset>
      );
    }
  });

  return <>{formListRender}</>;
}
