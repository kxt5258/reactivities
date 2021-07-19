import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const ActivityFilters = () => {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All Acitivities'></Menu.Item>
        <Menu.Item content="I'm going"></Menu.Item>
        <Menu.Item content="I'm hosting"></Menu.Item>
      </Menu>
      <Header />
      <Calendar />
    </>
  );
};

export default ActivityFilters;
