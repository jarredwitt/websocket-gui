import React, {memo, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {w3cwebsocket} from 'websocket';
import {useSetRecoilState} from 'recoil';

import {logsState} from 'state/logs';

function connectionStateLabel(state) {
  switch (state) {
    case 0:
      return 'Connecting...';
    case 1:
      return 'Connected';
    case 3:
      return 'Closed';
    default:
      return `${state} - Unknown`;
  }
}

function Connection(props) {
  const {id, name, url} = props;

  const setLogs = useSetRecoilState(logsState(id));

  const clientRef = useRef();
  const [connectionState, setConnectionState] = useState(0);

  useEffect(() => {
    const c = new w3cwebsocket(url);

    function handleLog(type, data) {
      setLogs((prev) => [
        ...prev,
        {
          type,
          data,
          date: Date.now(),
        },
      ]);
    }

    c.onclose = (e) => {
      console.log(e);
      setConnectionState(c.CLOSED);
    };

    c.onerror = (error) => {
      handleLog('error', error.message);
      setConnectionState(c.CLOSED);
    };

    c.onopen = () => {
      setConnectionState(c.OPEN);
    };

    c.onmessage = (e) => {
      handleLog('message', e.data);
    };

    clientRef.current = c;

    return () => {
      c.close();
      clientRef.current = null;
    };
  }, [url, setLogs]);

  return (
    <div className="connection">
      <div>{name}</div>
      <div>{connectionStateLabel(connectionState)}</div>
    </div>
  );
}

Connection.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default memo(Connection);
