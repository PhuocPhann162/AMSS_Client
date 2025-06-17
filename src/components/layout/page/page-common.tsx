import type { ComponentProps, FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface PageCommonProps extends ComponentProps<'div'> {
  headerTitle?: string;
  renderHeader?: (
    HeaderComp: FC<ComponentProps<'header'>>,
    headerTitle: ReactNode,
  ) => ReactNode;
  classNames?: Partial<Record<'header' | 'headerTitle' | 'body', string>>;
}

export const PageCommon = ({
  headerTitle,
  children,
  renderHeader,
  classNames,
  ...props
}: PageCommonProps) => {
  const titleElement = (
    <h1 className={twMerge('text-xl font-semibold', classNames?.headerTitle)}>
      {headerTitle}
    </h1>
  );

  const HeaderComp = (props: ComponentProps<'header'>) => (
    <header
      {...props}
      className={twMerge(
        'sticky top-0 z-50 bg-neutral-50 px-4 py-3',
        classNames?.header,
        props.className,
      )}
    />
  );

  return (
    <div
      {...props}
      className={twMerge('flex h-full flex-col', props.className)}
    >
      {renderHeader ? (
        renderHeader(HeaderComp, titleElement)
      ) : (
        <HeaderComp>{titleElement}</HeaderComp>
      )}
      <div className={twMerge('grow p-4 pt-0', classNames?.body)}>
        {children}
      </div>
    </div>
  );
};
