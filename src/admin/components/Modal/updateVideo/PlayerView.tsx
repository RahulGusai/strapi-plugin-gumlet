import React, { FC } from 'react';
import styled from 'styled-components';
import { EnhancedCustomVideo } from '../../../pages/HomePage';
import ReactPlayer from 'react-player';

interface IPlayerViewProps {
  video: EnhancedCustomVideo;
}

const PlayerView: FC<IPlayerViewProps> = ({ video }) => {
  const { mp4 } = video;
  console.log(mp4);
  return (
    <Wrapper>
      <ReactPlayer
        url={mp4}
        controls={true}
        width="auto"
        height="300px"
        style={{
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      ></ReactPlayer>
    </Wrapper>
  );
};

export default PlayerView;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`;
