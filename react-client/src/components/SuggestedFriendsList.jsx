import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, ResponsiveContext } from 'grommet';
import axios from 'axios';
import SuggestedFriendCard from './SuggestedFriendCard.jsx';

const SuggestedFriends = ({ me }) => {
  let [suggestedFriends, setSuggestedFriends] = useState([]);

  const getSuggestedFriends = () => {
    axios.get('/api/user/suggest').then((res) => {
      setSuggestedFriends(res.data);
    });
  };

  // get friends once component mount
  useEffect(() => {
    getSuggestedFriends();
  }, []);

  const size = useContext(ResponsiveContext);

  return (
    <Box align="center" pad="large">
      {suggestedFriends.length ? (
        <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="medium">
          {suggestedFriends.map((user) => {
            return <SuggestedFriendCard me={me} user={user} />;
          })}
        </Grid>
      ) : null}
    </Box>
  );
};

export default SuggestedFriends;
