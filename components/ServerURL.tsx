import { useState } from 'react';
import HtmlHead from './HtmlHead';
import { checkURLProtocol, getProductName } from '../lib/utils';

type Props = {
  setServer: (s:string) => void
};

const ServerURL: React.FC<Props> = ({ setServer }: Props) => {
  const [inputText, setInputText] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorAlertText, setErrorAlertText] = useState('');

  const showErrorAlert = () => {
    setErrorAlert(true);
  };

  const hideErrorAlert = () => {
    setErrorAlert(false);
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handelSubmit = () => {
    const { validProtocol, url } = checkURLProtocol(inputText);
    if (validProtocol) {
      localStorage.setItem('serverURL', url);
      setServer(url);
    } else {
      setErrorAlertText('URL should starts with "https://" or "http://".');
      showErrorAlert();
    }
  };
  return (
    <>
      <HtmlHead title={`${getProductName()} - Setting Up`} />
      <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">{getProductName()}</span>
        </div>
      </nav>
      <main className="py-10">
        <div className="mx-auto w-4/5 px-4">
          <h2 className="py-2 font-bold">
            Server URL:
          </h2>
          <input type="text" value={inputText} onChange={handleChange} className="mr-2 py-2 border-b border-gray-500 focus:outline-none" />
          <button type="button" onClick={handelSubmit} className="border border-gray-500 rounded p-2 hover:bg-green-500 hover:text-white hover:border-green-700 focus:outline-none transition-all duration-500 ease-in-out">Submit</button>
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
      </main>
    </>
  );
};

export default ServerURL;
