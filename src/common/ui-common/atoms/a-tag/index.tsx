import { Tag, TagProps } from 'antd';
import clsx from 'clsx';
import { forwardRef, Ref } from 'react';

type ATagProps = TagProps;

const ATag = forwardRef<HTMLElement, ATagProps>((props, ref: Ref<HTMLElement>) => {
  const { children, ...rest } = props;
  return (
    <Tag bordered={false} {...rest} ref={ref} className={clsx('py-1 px-3', props.className)}>
      <span className='font-bold'>{children}</span>
    </Tag>
  );
});

ATag.displayName = 'ATag';
export { ATag };
