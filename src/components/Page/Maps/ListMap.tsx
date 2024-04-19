import { Marker, Polygon, Popup } from 'react-leaflet';
import { useGetAllFarmsQuery } from '~/api/farmApi';
import { useGetAllFieldsQuery } from '~/api/fieldApi';
import { farmModel, fieldModel } from '~/interfaces';
import { PopupFarm } from './PopupFarm';
import positionModel from '~/interfaces/positionModel';

export const ListMap = () => {
  const { data: dataFarm } = useGetAllFarmsQuery('');
  const { data: dataField } = useGetAllFieldsQuery('');
  const getDrawFarmPolygon = (farmData: farmModel) => {
    const pos: [number, number][] =
      farmData.polygonApp?.positions?.map((position: positionModel) => {
        return [position.lat || 0, position.lng || 0];
      }) ?? [];
    return pos;
  };

  const getDrawFieldPolygon = (fieldData: fieldModel) => {
    const pos: [number, number][] =
      fieldData.polygonApp?.positions?.map((position: positionModel) => {
        return [position.lat || 0, position.lng || 0];
      }) ?? [];
    return pos;
  };

  return (
    <>
      {dataFarm &&
        dataFarm?.apiResponse?.result.map((item: farmModel) => (
          <div key={item.id}>
            <Polygon
              positions={getDrawFarmPolygon(item)}
              pathOptions={{
                color: item.polygonApp?.color,
                fillColor: 'transparent'
              }}
            >
              <Popup className='w-72'>
                <PopupFarm farmInfo={item} />
              </Popup>
            </Polygon>
            <Marker position={[item?.location?.lat ?? 0, item?.location?.lng ?? 0]}>
              <Popup className='w-72'>
                <PopupFarm farmInfo={item} />
              </Popup>
            </Marker>
          </div>
        ))}

      {dataField &&
        dataField?.apiResponse?.result.map((item: fieldModel) => (
          <div key={item.id}>
            <Polygon
              positions={getDrawFieldPolygon(item)}
              pathOptions={{
                color: item.polygonApp?.color,
                fillColor: item.polygonApp?.color
              }}
            >
              <Popup className='w-72'>
                <PopupFarm farmInfo={item} />
              </Popup>
            </Polygon>
          </div>
        ))}
    </>
  );
};
