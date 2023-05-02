import './SocialIcon.css';

type SocialIconType = {
  href: string;
  child: any;
  color: string;
};

export const SocialIcon = ({ child, href, color }: SocialIconType) => {
  return (
    <a href={href} target='_blank' rel='noreferrer'>
      <div className='social-icon' style={{ color }}>
        {child}
      </div>
    </a>
  );
};
