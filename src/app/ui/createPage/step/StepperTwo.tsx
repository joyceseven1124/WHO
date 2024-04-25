import { Theme } from '@/src/app/theme';
import { ThemeProvider } from 'styled-components';
import BusinessCardForm from '../businessCardForm/BusinessCardForm';

export default function StepperTwo() {
  return (
    <ThemeProvider theme={Theme}>
      <BusinessCardForm />
    </ThemeProvider>
  );
}
