import React, { FC } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { CustomVideo } from '../../../../types';

interface IPlayerViewProps {
  video: CustomVideo;
}

const PlayerView: FC<IPlayerViewProps> = ({ video }) => {
  const { playbackUrl } = video;
  return (
    <Wrapper>
      <ReactPlayer
        url={playbackUrl}
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
