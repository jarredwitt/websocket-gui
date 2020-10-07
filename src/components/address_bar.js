import React, {useCallback, useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {connectionsState} from 'state/connections';

export default function AddressBar() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const setConnections = useSetRecoilState(connectionsState);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleUrlChange = useCallback((e) => {
    setUrl(e.target.value);
  }, []);

  const handleConnect = () => {
    setConnections((prev) => ({
      ...prev,
      [name]: {
        id: Date.now(),
        name,
        url,
      },
    }));

    setName('');
    setUrl('');
  };

  return (
    <div className="address-bar">
      <input
        type="text"
        value={name}
        placeholder="Connection name..."
        onChange={handleNameChange}
      />
      <input
        type="text"
        value={url}
        placeholder="ws://examplehost.com"
        onChange={handleUrlChange}
      />
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}
