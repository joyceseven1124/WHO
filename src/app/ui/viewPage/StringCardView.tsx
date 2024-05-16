import ViewTitle from '@/src/app/ui/viewPage/smallComponent/ViewTitle';
import { ComponentStructure } from '@/src/lib/feature/formDataSlice';

export default function StringCardView({
  value,
}: {
  value: ComponentStructure;
}) {
  const childKeyArray = Object.keys(value?.children);
  let childComponentArray;
  if (childKeyArray) {
    childComponentArray = childKeyArray.map(
      (childKey: string, index: number) => {
        if (value.children && value.children[childKey]) {
          let childData = value.children[childKey];
          return (
            <p className="py-5" key={childKey}>
              {childData.inputText}
            </p>
          );
        }
      }
    );
  }
  return (
    <div className="text-black">
      <ViewTitle>{value.componentTitle}</ViewTitle>
      {childComponentArray}
    </div>
  );
}
