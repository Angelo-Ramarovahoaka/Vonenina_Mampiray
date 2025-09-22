import TabBar from '@/components/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function RootLayout() {

  return (
   <React.Fragment>
    <Tabs 
        tabBar={props=> <TabBar {...props} />}
    >
      <Tabs.Screen 
      name='tantara'
      options={{
        title: "Tantara"
      }} 
      />
      <Tabs.Screen 
      name='mpiandraikitra'
      options={{
        title: "Mpiandraikitra"
      }} 
      />
      <Tabs.Screen 
      name='hafatra'
      options={{
        title: "Hafatra"
      }} 
      />
      <Tabs.Screen 
      name='fifandraisana'
      options={{
        title: "Fifandraisana"
      }} 
      />
      <Tabs.Screen 
      name='fikirana'
      options={{
        title: "Fikirana"
      }} 
      />
    </Tabs>
    </React.Fragment>
  );
}
