import { useState } from 'react';
import { css } from '@emotion/react';
import ClockLoader from 'react-spinners/ClockLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  border-color: white;
`;

function Loader() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#fff');

  return (
    <div className="sweet-loading">
      <ClockLoader color={color} loading={loading} css={override} size={50} />
    </div>
  );
}

export default Loader;
