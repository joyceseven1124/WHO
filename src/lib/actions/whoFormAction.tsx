'use server';
import { State } from '../definitions';
import { saveFormData } from '../handleData/handleContentData';

// export type State = {
//   errors?: any;
//   message?: string | null | undefined;
//   success?: boolean | undefined;
// };

export async function whoFormAction(
  prevState: State | void,
  formData: FormData
): Promise<State | void> {
  const jsonData: any = formData.get('formJsonData');
  const result = await saveFormData(JSON.parse(jsonData));
  // console.log('最後結果', result);
  // console.log('我的測試檔案', test);
}
