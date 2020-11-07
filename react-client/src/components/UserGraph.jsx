import React from 'react';
import { Graph } from 'react-d3-graph';
import { config } from './UserNodeConfig.jsx';
import { Box } from 'grommet';

const UserGraph = ({ me, users }) => {
  let data = { nodes: [], links: [] };
  // add yourself
  data.nodes.push({ id: me.name, me: me });
  users.forEach((user) => {
    // add the other user
    data.nodes.push({ id: user[0], user: user[1].userInfo });
    user[1].anime.forEach((anime) => {
      data.nodes.push({ id: anime.animeInfo.title, anime: anime.animeInfo });
      // debugger;
      // add links between yourself, the anime, and the other user
      data.links.push({
        source: user[1].userInfo.name,
        label: `They rated it a ${anime.friendStats.rating}`,
        target: anime.animeInfo.title,
      });
      data.links.push({
        source: me.name,
        label: `I rated it a ${anime.myStats.rating}`,
        target: anime.animeInfo.title,
      });
    });
  });
  return (
    <Box size="xlarge">
      <Graph
        id={`d3-graph-${users[0][0]}`} // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={config}
      />
    </Box>
  );
};

export default UserGraph;
