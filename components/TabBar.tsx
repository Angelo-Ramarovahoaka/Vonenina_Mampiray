import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const primaryColor = "#B7170F"; 
  const geyColor = "#9B9B9B";
  const { buildHref } = useLinkBuilder();
  const icons: { [key: string]: ({ color }: { color: string }) => React.ReactElement } = {
    tantara: ({ color }: { color: string }) => (
      <Svg width={38} height={38} viewBox="0 0 28 28">
        <Path 
          fill={color} 
          d="M4 19V8zm.616 1q-.691 0-1.153-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7H9V5.615q0-.69.463-1.153T10.616 4h2.769q.69 0 1.153.462T15 5.615V7h4.385q.69 0 1.152.463T21 8.616v4.198q-.239-.152-.479-.265q-.24-.112-.521-.21V8.616q0-.27-.173-.443T19.385 8H4.615q-.269 0-.442.173T4 8.616v9.769q0 .269.173.442t.443.173h7.459q.056.275.12.516q.063.24.153.484zM10 7h4V5.615q0-.269-.173-.442T13.385 5h-2.77q-.269 0-.442.173T10 5.615zm8 15q-1.671 0-2.835-1.164Q14 19.67 14 18t1.165-2.835T18 14t2.836 1.165T22 18t-1.164 2.836T18 22m.385-4.161v-2.723h-.77v3.046l2.035 2.034l.546-.546z" 
        />
      </Svg>
    ),
    mpiandraikitra: ({ color }: { color: string }) => (
      <Svg width={38} height={38} viewBox="0 0 28 28">
        <Path 
          fill={color} 
          d="M6.308 14.692h.884v-4.5h1.616v3h.884v-3h1.616v4.5h.884v-4.615q0-.329-.22-.549t-.549-.22H7.077q-.329 0-.549.22t-.22.549zm7.5 0h.884v-1.5h2.231q.329 0 .549-.22t.22-.549v-2.346q0-.329-.22-.549t-.549-.22h-3.115zm.884-2.384v-2.116h2.116v2.116zM5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M5 5v14z" 
        />
      </Svg>
    ),
    hafatra: ({ color }: { color: string }) => (
      <Svg width={36} height={36} viewBox="0 0 28 28">
        <Path 
          fill={color} 
          d="M3 20.59L6.59 17H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zM3 22H2V6a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7z" 
        />
      </Svg>
    ),
    fifandraisana: ({ color }: { color: string }) => (
      <Svg width={36} height={36} viewBox="0 0 28 28">
        <G fill="none" stroke={color} strokeWidth="1.5">
          <Path strokeLinecap="round" strokeLinejoin="round" d="M11 5h7m-8 5l4.5 4.5M5 11v7" />
          <Circle cx="6.444" cy="6.444" r="4.444" />
          <Circle cx="5" cy="20" r="2" />
          <Circle cx="16" cy="16" r="2" />
          <Circle cx="20" cy="5" r="2" />
        </G>
      </Svg>
    ),
    fikirana: ({ color }: { color: string }) => (
      <Svg width={38} height={38} viewBox="0 0 28 28">
        <Path 
          fill={color} 
          d="M10.96 21q-.349 0-.605-.229q-.257-.229-.319-.571l-.263-2.092q-.479-.145-1.036-.454q-.556-.31-.947-.664l-1.915.824q-.317.14-.644.03t-.504-.415L3.648 15.57q-.177-.305-.104-.638t.348-.546l1.672-1.25q-.045-.272-.073-.559q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626l-1.672-1.25q-.275-.213-.338-.555t.113-.648l1.06-1.8q.177-.287.504-.406t.644.021l1.896.804q.448-.373.97-.673q.52-.3 1.013-.464l.283-2.092q.061-.342.318-.571T10.96 3h2.08q.349 0 .605.229q.257.229.319.571l.263 2.112q.575.202 1.016.463t.909.654l1.992-.804q.318-.14.645-.021t.503.406l1.06 1.819q.177.306.104.638t-.348.547L18.36 10.92q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l1.69 1.27q.275.213.358.546t-.094.638l-1.066 1.839q-.176.306-.513.415q-.337.11-.654-.03l-1.923-.824q-.467.393-.94.673t-.985.445l-.264 2.111q-.061.342-.318.571t-.605.23zm.04-1h1.956l.369-2.708q.756-.2 1.36-.549q.606-.349 1.232-.956l2.495 1.063l.994-1.7l-2.189-1.644q.125-.427.166-.786q.04-.358.04-.72q0-.38-.04-.72t-.166-.747l2.227-1.683l-.994-1.7l-2.552 1.07q-.454-.499-1.193-.935q-.74-.435-1.4-.577L13 4h-1.994l-.312 2.689q-.756.161-1.39.52q-.633.358-1.26.985L5.55 7.15l-.994 1.7l2.169 1.62q-.125.336-.175.73t-.05.82q0 .38.05.755t.156.73l-2.15 1.645l.994 1.7l2.475-1.05q.589.594 1.222.953q.634.359 1.428.559zm.973-5.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727M12 12" 
        />
      </Svg>
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (['_sitemap', '_notfound'].includes(route.name)) return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={route.name}
          >
            {
                icons[route.name]({
                    color: isFocused ? primaryColor : geyColor, 
                })
            }
            <Text style={{ color: isFocused ? primaryColor : geyColor, fontSize: 12 }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
export default TabBar;
const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingBottom: 26,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
    tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 8,
  }
});

