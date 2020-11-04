import React from 'react';
import { Box, Image, Text, Avatar } from 'grommet';

const UserNode = ({ node }) => {
  let url;
  let size;
  // node can either be yourself, the other user, or an anime
  if (node.me) {
    size = 'large';
    url = node.me.picture;
  } else if (node.user) {
    size = 'medium';
    url = node.user.picture;
  } else if (node.anime) {
    size = 'small';
    url = node.anime.main_picture;
  }
  return (
    <>
      {node.me || node.user ? (
        <Avatar fit="contain" size={size} src={url} />
      ) : (
        <Image fit="cover" src={url} width={size} height={size} />
      )}
    </>
  );
};

export default UserNode;
