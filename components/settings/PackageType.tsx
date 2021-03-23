import { useState } from 'react';
import { mutate } from 'swr';
import { checkURLProtocol, getServerURL } from '../../lib/utils';

type Props = {
  packageTypeName: string
  registry: string
};

const Item: React.FC<Props> = ({ packageTypeName, registry }: Props) => {
  const [inputText, setInputText] = useState(registry);
  const [editMode, setEditMode] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertText, setErrorAlertText] = useState('');
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  const quitEditMode = () => {
    setInputText(registry);
    setEditMode(false);
  };

  const showErrorAlert = () => {
    setErrorAlert(true);
  };

  const hideErrorAlert = () => {
    setErrorAlert(false);
  };
  const handleSubmit = async () => {
    const { validProtocol, url } = checkURLProtocol(inputText);
    if (validProtocol) {
      await fetch(`${getServerURL()}/package_type/${packageTypeName}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `registry=${url}`,
      });
      await mutate(`${getServerURL()}/package_types`);
      setInputText(url);
      setEditMode(false);
    } else {
      setErrorAlertText('URL should starts with "https://" or "http://".');
      showErrorAlert();
    }
  };
  return (
    <>
      <td className="px-4 pt-2 pb-12 relative">
        {editMode ? (
          <>
            <div>
              <input type="text" value={inputText} onChange={handleChange} className="w-64 mr-2 py-2 border-b border-gray-500 focus:outline-none" />
              <button type="button" onClick={handleSubmit} className="w-16 mr-2 border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out">OK</button>
              <button type="button" onClick={quitEditMode} className="w-16 border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out">Cancel</button>
            </div>
            { errorAlert
            && (
            <div className="absolute bottom-0 bg-red-100 border border-red-400 text-red-700 pl-4 pr-16 py-1 mb-2 rounded" role="alert">
              <span className="block sm:inline">{errorAlertText}</span>
              <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-1 focus:outline-none" onClick={hideErrorAlert}>
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
            )}
          </>
        ) : (
          <>
            <span className="inline-block mr-4 w-64">{registry}</span>
            <button type="button" onClick={enterEditMode} className="w-16 border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out">Edit</button>
          </>
        )}
      </td>
    </>
  );
};

export default Item;
