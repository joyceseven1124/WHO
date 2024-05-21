import reducer, {
  FormInitPayload,
  addFormChildElement,
  addFormElement,
  changeFormChildElement,
  editFormChildElement,
  removeFormChildElement,
  removeFormElement,
} from '@/src/lib/feature/formDataSlice';

describe('test for formDataSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      formData: {},
      selfInformation: {},
    });
  });

  test('should handle an formData add action', () => {
    const payload = {
      nodeKey: '12',
      componentType: 'PortfolioEditCard',
      componentCount: 12,
      children: { '122': {} },
    };
    expect(reducer(undefined, addFormElement(payload))).toEqual({
      formData: {
        '12': {
          componentType: 'PortfolioEditCard',
          componentCount: 12,
          children: { '122': {} },
        },
      },
      selfInformation: {},
    });
  });

  test('should handle an formData remove action', () => {
    const initialState = {
      formData: {
        '12': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: { '122': {} },
        },

        '13': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: { '122': {} },
        },
      },
      selfInformation: {},
    };

    const payload = {
      nodeKey: '12',
    };

    expect(reducer(initialState, removeFormElement(payload))).toEqual({
      formData: {
        '13': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: { '122': {} },
        },
      },
      selfInformation: {},
    });
  });

  test('should handle an element of formData edit action', () => {
    const initialState = {
      formData: {
        '12': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: { '122': {} },
        },
      },
      selfInformation: {},
    };
    const payload = {
      nodeKey: '12',
      childKey: '122',
      elements: { position: 123 },
    };
    expect(reducer(initialState, editFormChildElement(payload))).toEqual({
      formData: {
        '12': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: { '122': { position: 123 } },
        },
      },
      selfInformation: {},
    });
  });

  test('should handle an element of formData change position action', () => {
    const initialState = {
      formData: {
        '12': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: {
            '122': {},
            '123': {},
            '124': {},
          },
        },
      },
      selfInformation: {},
    };
    const payload = {
      nodeKey: '12',
      childrenPositionArray: ['124', '123', '122'],
    };
    expect(reducer(initialState, changeFormChildElement(payload))).toEqual({
      formData: {
        '12': {
          componentType: 'PortfolioEditCard',
          componentTitle: 'hello',
          componentCount: 12,
          children: {
            '124': {},
            '123': {},
            '122': {},
          },
        },
      },
      selfInformation: {},
    });
  });
});
