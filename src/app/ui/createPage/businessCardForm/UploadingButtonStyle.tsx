import styled from 'styled-components';

const UploadingButtonStyle = styled.span`
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  height: fit-content;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default function UploadingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UploadingButtonStyle>{children}</UploadingButtonStyle>;
}
