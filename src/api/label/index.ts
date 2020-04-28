import amazonWebServices from '../../services/AWS';

const detectLables = async (buffer: any): Promise<any> => {
  return amazonWebServices.detectLables(buffer);
};

export default detectLables;
