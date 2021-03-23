export const fetcher = (
  input: RequestInfo, init?: RequestInit,
):Promise<unknown> => fetch(input, init)
  .then((res) => res.json());

export const doesPackageExistInRegistry = async (
  packageName: string, registryUrl: string,
):Promise<boolean> => {
  type Result = {
    error?: string
  };
  const result = await fetcher(`${registryUrl}/${packageName}`) as Result;
  return !result.error;
};

type CheckURLProtocolResult = {
  validProtocol: boolean
  url: string
};

export const checkURLProtocol = (text: string):CheckURLProtocolResult => {
  const myURL = new URL(text);
  if (myURL.protocol !== 'https:' && myURL.protocol !== 'http:') {
    return {
      validProtocol: false,
      url: '',
    };
  }
  return {
    validProtocol: true,
    url: myURL.href.replace(/\/+$/, ''),
  };
};

export const getServerURL = ():string => localStorage.getItem('serverURL') || '';

export const setServerURL = (url: string):void => {
  localStorage.setItem('serverURL', url);
};

export const removeServerURL = ():void => {
  localStorage.removeItem('serverURL');
};

export const getProductName = ():string => process.env.productName || 'Is New Package Available';
