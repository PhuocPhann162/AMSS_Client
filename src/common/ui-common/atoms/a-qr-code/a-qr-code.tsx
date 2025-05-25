import QRCode from 'antd/es/qr-code';
import type { QRCodeProps } from 'antd/es/qr-code/interface';

export type AQRCodeProps = QRCodeProps;

export const AQRCode = (props: AQRCodeProps) => {
  return <QRCode type='svg' {...props} />;
};
