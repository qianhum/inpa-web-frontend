import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { fetcher, getServerURL, doesPackageExistInRegistry } from '../../lib/utils';

type SWRResult = {
  data: {
    packageType: {
      registry: string
    }
  }
  error: Record<string, unknown>
};

const AddPackage: React.FC = () => {
  const [text, setText] = useState('');
  const [infoAlert, setInfoAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [errorText, setErrorText] = useState('');

  const hideInfoAlert = () => {
    setInfoAlert(false);
  };
  const hideErrorAlert = () => {
    setErrorAlert(false);
  };
  const showInfoAlert = () => {
    hideErrorAlert();
    setInfoAlert(true);
  };
  const showErrorAlert = () => {
    hideInfoAlert();
    setErrorAlert(true);
  };
  const { data, error } = useSWR(`${getServerURL()}/package_type/npm/`, fetcher) as SWRResult;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { packageType: { registry } } = data;

  type FetchResult = {
    package?: Record<string, unknown>
  };
  const doesPackageExistInDatabase = async (packageName: string) => {
    const { package: npmPackage } = await fetcher(`${getServerURL()}/package/npm/${packageName}`) as FetchResult;
    return !!npmPackage;
  };

  const handleSubmit = async () => {
    if (text) {
      const encodedText = text.split('/').join('%2F');
      const packageExistsInDatabase = await doesPackageExistInDatabase(encodedText);
      if (!packageExistsInDatabase) {
        const packageExistsInRegistry = await doesPackageExistInRegistry(encodedText, registry);
        if (packageExistsInRegistry) {
          await fetch(`${getServerURL()}/package/npm/${encodedText}`, {
            method: 'POST',
          });
          await mutate(`${getServerURL()}/packages`);
          setInfoText(`${text} added to database`);
          showInfoAlert();
          setText('');
        } else {
          setErrorText(`${text} does not exist in registry`);
          showErrorAlert();
        }
      } else {
        setErrorText(`${text} already exists in database`);
        showErrorAlert();
      }
    }
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="relative">
      <div className="pb-12 px-4">
        <label htmlFor="input-add-package">
          Add a package:
          <input type="text" id="input-add-package" className="border-b border-gray-500 p-2 mx-4 focus:outline-none" value={text} onChange={handleChange} />
        </label>
        <button type="button" className="border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out" onClick={handleSubmit}>Submit</button>
      </div>
      { infoAlert
      && (
      <div className="absolute bottom-0 bg-green-100 border border-green-400 text-green-700 pl-4 pr-16 py-1 mb-2 ml-4 rounded" role="alert">
        <span className="block sm:inline">{infoText}</span>
        <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-1 focus:outline-none" onClick={hideInfoAlert}>
          <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
      )}
      { errorAlert
      && (
      <div className="absolute bottom-0 bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-1 mb-2 ml-4 rounded" role="alert">
        <span className="block sm:inline">{errorText}</span>
        <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-1 focus:outline-none" onClick={hideErrorAlert}>
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
      )}
    </div>
  );
};

export default AddPackage;
