import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Heading,
  Text,
  Box,
  Button,
} from 'grommet';
import UserGraph from './UserGraph.jsx';

const SuggestedFriendCard = ({ me, user }) => {
  let [renderGraph, toggleRender] = useState(false);

  let capitalizedName = `${user[0].charAt(0).toUpperCase()}${user[0].slice(1)}`;
  return (
    <>
      <Box direction="column">
        <Box direction="row">
          <Card height="medium" width="medium" background="dark-1">
            <CardHeader pad="medium">
              <Box direction="row" gap="medium" justify="start">
                <Box direction="column">
                  <Avatar size="large" src={user[1].userInfo.picture} allyTitle={user[0]} />
                </Box>
                <Box direction="column" justify="end">
                  <Heading level="3">{capitalizedName}</Heading>
                </Box>
              </Box>
            </CardHeader>
            <CardBody pad="medium">
              {user[1].anime.map((anime) => {
                return <Text>{anime.name}</Text>;
              })}
            </CardBody>
            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }} background="#000000A0">
              <Text>{`You are both fans of ${user[1].animeInCommon} different anime!`}</Text>
            </CardFooter>
          </Card>
        </Box>
        <Box direction="row">
          <Button align="center" pad="medium" label={`View ${capitalizedName}'s MAL`} />
          <Button
            pad="medium"
            onClick={() => {
              toggleRender(true);
            }}
            label={'View anime you share'}
          />
        </Box>
        <Box direction="row">{renderGraph ? <UserGraph me={me} users={[user]} /> : null}</Box>
      </Box>
    </>
  );
};

export default SuggestedFriendCard;
