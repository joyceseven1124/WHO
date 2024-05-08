import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TextArea from '../smallElement/TextArea';

export default function BaseInformationList() {
  return (
    <div className="text-black">
      <BadgeIcon />
      <label>姓名</label>
      <input
        type="text"
        maxLength={10}
        placeholder="限制10字元"
        id="formName"
      />
      <div>
        <EmailIcon />
        <label>信箱</label>
        <input
          type="mail"
          maxLength={30}
          placeholder="限制30字元"
          id="formMail"
        />
      </div>

      <div>
        <SmartphoneIcon />
        <label>phone</label>
        <input
          type="tel"
          maxLength={10}
          placeholder="輸入手機號碼"
          id="formPhone"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        />
      </div>

      <TextArea placeholderText="輸入相關自我介紹" />
      {/* <label>社群媒體</label>
      <input
        type="mail"
        maxLength={30}
        placeholder="限制30字元"
        id="formMail"
      /> */}
      <div>
        <GitHubIcon />
        <LinkedInIcon />
        <FacebookIcon />
        <InstagramIcon />
        <InsertLinkIcon />
      </div>
    </div>
  );
}
