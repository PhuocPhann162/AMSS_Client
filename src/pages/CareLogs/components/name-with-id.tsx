import { CopyableEllipsisText } from '@/components/text/copyable-ellipsis-text';
import { EllipsisText } from '@/components/text/ellipsis-text';
import { twMerge } from 'tailwind-merge';

export interface NameWithIdProps {
  name: string;
  id: string;
  className?: string;
  classNames?: Partial<Record<'name' | 'id', string>>;
}

export const NameWithId = ({
  name,
  id,
  className,
  classNames,
}: NameWithIdProps) => {
  return (
    <div className={twMerge('flex flex-col', className)}>
      <EllipsisText className={twMerge('font-medium', classNames?.name)}>
        {name}
      </EllipsisText>
      <CopyableEllipsisText
        classNames={{
          text: twMerge('text-xs text-neutral-500', classNames?.id),
        }}
      >
        {id}
      </CopyableEllipsisText>
    </div>
  );
};
