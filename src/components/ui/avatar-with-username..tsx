import { AAvatar } from '@/common/ui-common';
import { getFirstTwoCharacters } from '@/lib/string';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface AvatarWithUsernameProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  avatar?: string;
  showName?: boolean;
  showAvatar?: boolean;
}

export const AvatarWithUsername = forwardRef<
  HTMLButtonElement,
  AvatarWithUsernameProps
>(({ name, avatar, showName = true, showAvatar = true, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={twMerge('flex items-center gap-2', props.className)}
    >
      {showAvatar && (
        <AAvatar src={avatar}>{getFirstTwoCharacters(name || '')}</AAvatar>
      )}
      {showName && name && <p className='font-semibold'>{name}</p>}
    </button>
  );
});
AvatarWithUsername.displayName = 'AvatarWithUsername';
