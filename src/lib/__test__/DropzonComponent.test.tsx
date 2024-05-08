import DropzoneComponent from '@/src/app/ui/createPage/formComponent/smallElement/handleImage/DropzoneComponent';
import { ChildKeyContext, NodeKeyContext } from '@/src/lib/provider/context';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/testUtils';

test('Dropzone should accept', async () => {
  const nodeKey = 'testNodeKey';
  const childKey = 'testChildKey';

  const { getByText, getByTestId, store } = renderWithProviders(
    <NodeKeyContext.Provider value={nodeKey}>
      <ChildKeyContext.Provider value={childKey}>
        <DropzoneComponent />
      </ChildKeyContext.Provider>
    </NodeKeyContext.Provider>,
    {
      preloadedState: {
        FormData: {
          formData: {
            testNodeKey: {
              componentType: 'PortfolioEditCard',
              children: { testChildKey: {} },
            },
          },
        },
      },
    }
  );
  const mockFunction = jest.fn();
  URL.createObjectURL = mockFunction.mockReturnValue('/test');
  // 等component加載完成
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const input = getByTestId('dropzone-input');

  const file = new File(['test file'], 'test.png', { type: 'image/png' });

  fireEvent.change(input, { target: { files: [file] } });

  // 等待文件上傳
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const state = store.getState().FormData.formData;
  expect(state.testNodeKey.children.testChildKey.imageURL).toContain('/test');
  expect(state.testNodeKey.children.testChildKey.imageInformation).toContain(
    'test.png'
  );
});
