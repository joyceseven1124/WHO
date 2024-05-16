import CombineDataView from '@/src/app/ui/viewPage/CombineDataView';
import { fetchViewContent } from '@/src/lib/handleData/handleContentData';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Hello',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log('這個使用者是誰', id);
  const result = await fetchViewContent(id);
  console.log('獲取的檔案', result);
  if (result.success && result.data) {
    const data = {
      formData: result.data.formData,
      selfInformation: result.data.selfInformation,
    };
    return (
      <div className="mt-10">
        <CombineDataView allData={data} />
      </div>
    );
  } else {
    return <div className="text-center text-black">查無資料</div>;
  }
}
