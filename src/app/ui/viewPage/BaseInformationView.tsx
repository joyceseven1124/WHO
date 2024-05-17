import { MEDIA_QUERY_SM } from '@/src/app/style';
import { SelfInformationType } from '@/src/lib/feature/formDataSlice';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import styled from 'styled-components';

const BaseInformationDataView = styled.div`
  display: flex;
  column-gap: 10px;
  font-size: 18px;
  padding: 10px 0px;
`;

const BaseInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: black;
  height: fit-content;
  ${MEDIA_QUERY_SM} {
    display: grid;
    grid-template-columns: fit-content 1fr;
    gap: 20px 50px;
  }
`;

const BaseMediaInputGroup = styled.div`
  grid-column: 1/3;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 20px;
  height: fit-content;
`;

export default function BaseInformationView({
  baseData,
}: {
  baseData: SelfInformationType;
}) {
  return (
    <BaseInformationWrapper>
      <div>
        {baseData.userName && baseData.userName?.length > 0 && (
          <BaseInformationDataView>
            <BadgeIcon />
            <p>{baseData.userName}</p>
          </BaseInformationDataView>
        )}

        {baseData.userEmail && baseData.userEmail?.length > 0 && (
          <BaseInformationDataView>
            <EmailIcon />
            <p>{baseData.userEmail}</p>
          </BaseInformationDataView>
        )}

        {baseData.userPhone && baseData.userPhone?.length > 0 && (
          <BaseInformationDataView>
            <SmartphoneIcon />
            <p>{baseData.userPhone}</p>
          </BaseInformationDataView>
        )}
      </div>

      <div>
        {baseData.userIntroduction && baseData.userIntroduction?.length > 0 && (
          <div>
            <p>{baseData.userIntroduction}</p>
          </div>
        )}
      </div>

      <BaseMediaInputGroup>
        {baseData.gitHub && baseData.gitHub?.length > 0 && (
          <a href={`${baseData.gitHub}`}>
            <GitHubIcon />
          </a>
        )}

        {baseData.linkedIn && baseData.linkedIn?.length > 0 && (
          <a href={baseData.linkedIn}>
            <LinkedInIcon />
          </a>
        )}

        {baseData.facebook && baseData.facebook?.length > 0 && (
          <a href={baseData.facebook}>
            <FacebookIcon />
          </a>
        )}

        {baseData.instagram && baseData.instagram?.length > 0 && (
          <a href={baseData.instagram}>
            <InstagramIcon />
          </a>
        )}

        {baseData.otherUrl && baseData.otherUrl?.length > 0 && (
          <a href={baseData.otherUrl}>
            <InsertLinkIcon />
          </a>
        )}
      </BaseMediaInputGroup>
    </BaseInformationWrapper>
  );
}
