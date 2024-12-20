// Remix Icons: https://remixicon.com/
// Github: https://github.com/Remix-Design/RemixIcon
import * as RemixIcons from '@remixicon/react';

export type IconName =
  | 'RiSun'
  | 'RiMoon'
  | 'RiNotification3'
  | 'RiUser'
  | 'RiUserStar'
  | 'RiUserFollow'
  | 'RiUserUnfollow'
  | 'RiPencil'
  | 'RiSearch'
  | 'RiKey2'
  | 'RiMapPin'
  | 'RiLinks'
  | 'RiBookmark'
  | 'RiDraft'
  | 'RiArrowRightUp'
  | 'RiArrowRight'
  | 'RiArrowLeft'
  | 'RiArrowDownS'
  | 'RiArrowUpS'
  | 'RiMore'
  | 'RiLoader5'
  | 'RiRadioButton'
  | 'RiClose'
  | 'RiAdd'
  | 'RiSubtract'
  | 'RiFileCopy'
  | 'RiUpload2'
  | 'RiDeleteBin4'
  | 'RiNavigation'
  | 'RiSettings3'
  | 'RiHistory'
  | 'RiShareForward'
  | 'RiEdit2'
  | 'RiHeart3'
  | 'RiCalendar'
  | 'RiMail'
  | 'RiMailOpen'
  | 'RiMailSend'
  | 'RiCodeSSlash'
  | 'RiGithub'
  | 'RiTwitterX'
  | 'RiDiscord'
  | 'RiGoogle'
  | 'RiMeta'
  | 'RiInstagram'
  | 'RiLinkedin'
  | 'RiCheck'
  | 'RiLoginBox'
  | 'RiLogoutBoxR'
  | 'RiErrorWarning'
  | 'RiVerifiedBadge'
  | 'RiArticle'
  | 'RiEye'
  | 'RiEyeClose';

export type IconProps = {
  name: IconName;
  type?: 'Fill' | 'Line';
  size?: number;
  className?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  type = 'Line',
  size = 20,
  className,
}) => {
  const iconName = `${name}${type}`;

  const DynamicIcon = RemixIcons[iconName as keyof typeof RemixIcons];

  if (!DynamicIcon) {
    console.error(`Icon "${iconName}" does not exist in RemixIcons.`);
    return null;
  }

  return <DynamicIcon className={className} size={size} />;
};

export default Icon;
