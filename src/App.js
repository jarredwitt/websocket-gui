import React, {useCallback, useState} from 'react';
import {useRecoilValue} from 'recoil';

import AddressBar from 'components/address_bar';
import ConnectionsList from 'components/connections_list';
import LogViewer from 'components/log_viewer';
import {connectionsState} from 'state/connections';

import './app.css';

function App() {
  const [selectedConnection, setSelectedConnection] = useState(0);

  const connections = useRecoilValue(connectionsState);

  const onConnectionClick = useCallback((id) => {
    setSelectedConnection(id);
  }, []);

  return (
    <div className="app">
      <AddressBar />
      <div className="content">
        <ConnectionsList
          onConnectionClick={onConnectionClick}
          selectedConnection={selectedConnection}
        />
        {Object.values(connections).map((c) => (
          <LogViewer
            key={c.id}
            connectionId={c.id}
            show={selectedConnection === c.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
