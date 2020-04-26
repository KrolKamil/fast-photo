import amazonWebServices from '../../services/AWS';

const detectLables = async (buffer: any) => {
  return amazonWebServices.detectLables(buffer);
};

export default detectLables;
