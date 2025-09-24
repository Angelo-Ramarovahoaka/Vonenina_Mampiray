// @@iconify-code-gen
import TabBar from '@/components/TabBar';
import { AuthContext } from '@/utils/AuthContext';
import { Redirect, Tabs } from 'expo-router';
import React, { useContext } from 'react';


export default function ProtectedLayout() {
  const authstate = useContext(AuthContext);

  // useEffect(() => {
  //   if (!authstate.isLoggedIn) {
      
  //   }
  // }, [authstate.isLoggedIn]);

  if (!authstate.isLoggedIn) {
    return <Redirect href="/login" />;
  }

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
