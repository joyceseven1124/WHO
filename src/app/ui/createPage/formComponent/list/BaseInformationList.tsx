import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
  MEDIA_QUERY_SSM,
} from '@/src/app/style';
import { useAppDispatch, useAppSelector } from '@/src/lib/RThooks';
import {
  editSelfInformation,
  selectSelfInformation,
} from '@/src/lib/feature/formDataSlice';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import styled from 'styled-components';
import TextArea from '../smallElement/TextArea';

const BaseInformationWrapper = styled.div`
  /* grid-template-rows: 1fr 1fr 1fr; */
  /* grid-template-columns: 1fr; */
  /* grid-template-columns: 1f; */
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${MEDIA_QUERY_SM} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }
`;

const BaseSelfInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const BaseMediaInputGroup = styled.div`
  grid-column: 1/3;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  ${MEDIA_QUERY_SM} {
    grid-template-columns: 1fr 1fr;
  }
`;

const CommonInput = styled.input`
  margin-left: 15px;
  border: 1px solid gray;
  padding: 5px;
  outline: none;
  border-radius: 5px;
  height: 50px;
`;

const BaseInput = styled.div`
  display: grid;
  grid-template-columns: 20px 40px auto;
  align-items: center;
  label {
    margin-left: 5px;
  }
`;

const BaseMediaInput = styled.div`
  display: flex;
  align-items: center;
  /* display: grid;
  grid-template-columns: 20px 40px auto; */
  input {
    width: 100%;
  }
  /* label {
    margin-left: 5px;
  } */
`;

export default function BaseInformationList() {
  const userInformationData = useAppSelector(selectSelfInformation);
  const userInformationDataTest = useAppSelector((state) => state.FormData);
  const dispatch = useAppDispatch();
  const editSelfInformationDispatch = (inputValue: string) => {
    dispatch(editSelfInformation({ userIntroduction: inputValue }));
  };
  return (
    <BaseInformationWrapper className="text-black">
      <BaseSelfInputGroup>
        <BaseInput>
          <BadgeIcon />
          <label>姓名</label>
          <CommonInput
            type="text"
            maxLength={10}
            placeholder="限制10字元"
            id="formName"
            onChange={(e) => {
              dispatch(editSelfInformation({ userName: e.target.value }));
            }}
            value={userInformationData.userName || ''}
          />
        </BaseInput>

        <BaseInput>
          <EmailIcon />
          <label>信箱</label>
          <CommonInput
            type="mail"
            maxLength={40}
            placeholder="限制40字元"
            id="formMail"
            onChange={(e) => {
              dispatch(editSelfInformation({ userEmail: e.target.value }));
            }}
            value={userInformationData.userEmail || ''}
          />
        </BaseInput>

        <BaseInput>
          <SmartphoneIcon />
          <label>手機</label>
          <CommonInput
            type="tel"
            maxLength={10}
            placeholder="輸入手機號碼"
            id="formPhone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            onChange={(e) => {
              dispatch(editSelfInformation({ userPhone: e.target.value }));
            }}
            value={userInformationData.userPhone || ''}
          />
        </BaseInput>
      </BaseSelfInputGroup>

      <div className="border">
        <TextArea
          placeholderText="輸入相關自我介紹200字"
          textCount={200}
          dispatchFunction={editSelfInformationDispatch}
          value={userInformationData.userIntroduction}
          styleHeight="200px"
        />
      </div>
      <BaseMediaInputGroup>
        <BaseMediaInput>
          <GitHubIcon />
          <CommonInput
            type="text"
            placeholder="輸入GitHub網址"
            onChange={(e) => {
              dispatch(editSelfInformation({ gitHub: e.target.value }));
            }}
            value={userInformationData.gitHub || ''}
          />
        </BaseMediaInput>

        <BaseMediaInput>
          <LinkedInIcon />
          <CommonInput
            type="text"
            placeholder="輸入LinkedIn網址"
            onChange={(e) => {
              dispatch(editSelfInformation({ linkedIn: e.target.value }));
            }}
            value={userInformationData.linkedIn || ''}
          />
        </BaseMediaInput>

        <BaseMediaInput>
          <FacebookIcon />
          <CommonInput
            type="text"
            placeholder="輸入Facebook網址"
            onChange={(e) => {
              dispatch(editSelfInformation({ facebook: e.target.value }));
            }}
            value={userInformationData.facebook || ''}
          />
        </BaseMediaInput>

        <BaseMediaInput>
          <InstagramIcon />
          <CommonInput
            type="text"
            placeholder="輸入Instagram網址"
            onChange={(e) => {
              dispatch(editSelfInformation({ instagram: e.target.value }));
            }}
            value={userInformationData.instagram || ''}
          />
        </BaseMediaInput>

        <BaseMediaInput>
          <InsertLinkIcon />
          <CommonInput
            type="text"
            placeholder="輸入其他關於您的網址"
            onChange={(e) => {
              dispatch(editSelfInformation({ otherUrl: e.target.value }));
            }}
            value={userInformationData.otherUrl || ''}
          />
        </BaseMediaInput>
      </BaseMediaInputGroup>
    </BaseInformationWrapper>
  );
}
