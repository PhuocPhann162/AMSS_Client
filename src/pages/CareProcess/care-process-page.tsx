import Card from 'antd/es/card';

export const CareProcessPage = () => {
  return (
    <div>
      <h1>Care Process</h1>
      <Card>
        <Card title='Fertilizer'>
          <p>1. Fertilizer</p>
        </Card>
        <Card title='Watering'>
          <p>2. Watering</p>
        </Card>
        <Card title='Pruning'>
          <p>3. Pruning</p>
        </Card>
      </Card>
    </div>
  );
};
