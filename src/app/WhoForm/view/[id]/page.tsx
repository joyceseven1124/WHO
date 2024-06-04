import CombineDataView from '@/src/app/ui/viewPage/CombineDataView';
import { fetchViewContent } from '@/src/lib/handleData/fetchContentData';
import { Metadata } from 'next';
const metadata: Metadata = {
  title: 'Hello',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const result = await fetchViewContent(id);
  if (result.success && result.data) {
    const data = {
      formData: result.data.formData,
      selfInformation: result.data.selfInformation,
    };
    return (
      <div className="my-10">
        <CombineDataView allData={data} />
      </div>
    );
  } else {
    return <div className="text-center text-black">查無資料</div>;
  }
}
