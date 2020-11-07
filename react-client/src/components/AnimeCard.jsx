import React, { useState } from 'react';
import { Text, Image, Layer, Box } from 'grommet';
import styled from 'styled-components';
import AnimeEntryModal from './AnimeEntryModal.jsx';

const StyledImage = styled(Image).attrs((props) => {
  return { className: props.hoverClass };
})`
  @keyframes grow {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  @keyframes shrink {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1);
    }
  }
  &.grow {
    animation: grow 200ms linear both;
  }
  &.shrink {
    animation: shrink 200ms linear both;
  }
`;

const AnimeCard = ({ entry }) => {
  const [hoverClass, setHoverClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? <AnimeEntryModal entry={entry} /> : null}
      <StyledImage
        onMouseOver={() => {
          setHoverClass('grow');
        }}
        onMouseLeave={() => {
          setHoverClass('shrink');
        }}
        onClick={() => setShowModal(true)}
        hoverClass={hoverClass}
        fit="contain"
        width="small"
        round="false"
        src={entry.main_picture.medium}
      />
    </>
  );
};

export default AnimeCard;
