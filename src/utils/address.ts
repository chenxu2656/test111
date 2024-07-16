import cityList from './city';
export const getAddressByCode = (code: string) => {
for (const region of cityList) {
    if (region.value === code) {
      return region.label;
    }
    for (const city of region.children) {
      if (city.value === code) {
        return `${region.label}-${city.label}`;
      }
      if (city.children) {
        for (const district of city.children) {
          if (district.value === code) {
            return `${region.label}-${city.label}-${district.label}`;
          }
        }
      }
    }
  }
  return 'Code not found';
}

export const getCodeByAddress = (address:string)=> {
  for (const region of cityList) {
    if (region.label === address) {
      return region.value;
    }
    for (const city of region.children) {
      if (city.label === address) {
        return city.value;
      }
      if (city.children) {
        for (const district of city.children) {
          if (district.label === address) {
            return district.value;
          }
        }
      }
    }
  }
  return 'Address not found';
}