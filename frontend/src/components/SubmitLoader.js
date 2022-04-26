import { useState } from 'react';
import { css } from '@emotion/react';
import SyncLoader from 'react-spinners/SyncLoader';

const override = css`
  display: block;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-color: white;
`;

function SubmitLoader() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#fff');

  return (
    <div className="sweet-loading">
      <SyncLoader color={color} loading={loading} css={override} size={12} />
    </div>
  );
}

export default SubmitLoader;
