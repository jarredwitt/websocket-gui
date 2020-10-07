import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useRecoilValue} from 'recoil';

import {connectionLogs} from 'state/logs';

function LogViewer(props) {
  const {connectionId, show} = props;

  const logs = useRecoilValue(connectionLogs(connectionId));

  useEffect(() => {}, [logs.length]);

  return (
    <div className="log-viewer" style={{display: show ? 'flex' : 'none'}}>
      {[...logs].reverse().map((l) => {
        const data = JSON.parse(l.data);

        return (
          <div key={l.date} className="log">
            <div className="log-info">
              <div>
                {l.type} - {l.date}
              </div>
            </div>
            <div className="log-content">
              <pre>{JSON.stringify(data, null, ' ')}</pre>
            </div>
          </div>
        );
      })}
    </div>
  );
}

LogViewer.propTypes = {
  connectionId: PropTypes.number.isRequired,
};

export default memo(LogViewer);
