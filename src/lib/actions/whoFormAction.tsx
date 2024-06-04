// 'use server';
import { State } from '../definitions';
import { saveFormData } from '../handleData/saveContentData';

export async function whoFormAction(
  prevState: State | void,
  formData: FormData
): Promise<State | void> {
  const jsonData: any = formData.get('formJsonData');
  const result = saveFormData(JSON.parse(jsonData));
}
