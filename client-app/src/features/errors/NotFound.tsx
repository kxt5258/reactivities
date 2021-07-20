import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - not able to find what you are looking for
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/activities' primary content='Activities Page' />
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
