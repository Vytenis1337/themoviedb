import { Form } from '../../components/Form/Form';
import { SocialIcon } from '../../components/SocialIcon/SocialIcon';
import { socialIcons } from '../../utils/socialIcons';

import './Contacts.css';

export const Contacts = () => {
  return (
    <div className='contacts'>
      <div className='contacts-icons'>
        {socialIcons.map((item) => {
          return <SocialIcon key={item.id} {...item} />;
        })}
      </div>

      <Form />
    </div>
  );
};
