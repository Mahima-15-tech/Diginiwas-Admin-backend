import Property from "../models/Property.js";

const generatePropertyId = async () => {
  const count = await Property.countDocuments();

  return `DW-${1001 + count}`;
};

export default generatePropertyId;