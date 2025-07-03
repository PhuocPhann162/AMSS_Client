import { Avatar, StepProps, Steps, StepsProps } from 'antd';
import { ONE_STEP_WIDTH } from '@/configs/component.config';
import { FC, useEffect, useState } from 'react';

type AStepsProps = StepsProps;

const convertStepsIcon = (
  step: StepProps,
  index: number,
  current: number,
): StepProps => {
  const newStep = {
    ...step,
    icon: (
      <Avatar
        style={{
          backgroundColor:
            index <= current
              ? 'rgba(var(--color-primary),var(--tw-border-opacity))'
              : 'rgba(0, 0, 0, 0.25)',
        }}
      >
        {index + 1}
      </Avatar>
    ),
  };
  return newStep;
};

const ASteps: FC<AStepsProps> = (props: AStepsProps) => {
  const [width, setWidth] = useState<number>(0);
  const [newStepItems, setNewStepItems] = useState<StepProps[]>([]);
  const { items, current } = props;
  useEffect(() => {
    if (items) {
      setWidth(items.length * ONE_STEP_WIDTH);
      setNewStepItems(
        items.map((item, idx) => convertStepsIcon(item, idx, current || 0)),
      );
    }
  }, [items, current]);
  return (
    <div className='flex items-center justify-center'>
      <Steps
        style={{
          maxWidth: `${width}px`,
        }}
        {...props}
        labelPlacement='vertical'
        items={newStepItems}
      />
    </div>
  );
};
export { ASteps };
