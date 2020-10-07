import React, {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useRecoilValue} from 'recoil';

import Connection from 'components/connection';
import {connectionsState} from 'state/connections';

function ConnectionsList(props) {
  const {onConnectionClick, selectedConnection} = props;

  const connections = useRecoilValue(connectionsState);

  const handleConnectionClick = useCallback(
    (id) => () => {
      onConnectionClick(id);
    },
    [onConnectionClick],
  );

  return (
    <div className="connections-list">
      {Object.values(connections).map((c) => (
        <div
          key={c.id}
          onClick={handleConnectionClick(c.id)}
          style={{
            background: selectedConnection === c.id ? 'green' : 'transparent',
          }}>
          <Connection key={c.id} id={c.id} name={c.name} url={c.url} />
        </div>
      ))}
    </div>
  );
}

ConnectionsList.propTypes = {
  onConnectionClick: PropTypes.func.isRequired,
  selectedConnection: PropTypes.number.isRequired,
};

export default memo(ConnectionsList);
