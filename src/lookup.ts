import directory from "@antiraids/directory.json";
import axios from "axios";
import _ from "lodash";

type Position = { latitude: number; longitude: number };

export const groups = async ({ latitude, longitude }: Position) => {
  const response = await axios.get(
    `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
  );

  const district = _.uniq(
    response.data.result.map((r: any) => r.admin_district)
  )[0] as string;

  return directory.filter((group) => group.districts.includes(district));
};

export const map = ({ latitude, longitude }: Position) => {
  return `https://maps.google.com/?q=${latitude},${longitude}`;
};
