import provinceModel from './provinceModel';

export default interface countryContinentModel {
  id?: string;
  co2Rate?: number;
  coninentCode?: string;
  continentName?: string;
  countryCode?: string;
  countryName?: string;
  provinces?: provinceModel[];
  createdAt?: string;
  updatedAt?: string;
}
