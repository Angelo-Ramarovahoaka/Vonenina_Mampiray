import { PlatformPressable, Text } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

function TabBar({ state, descriptors, navigation }) {
  const primaryColor = "#B7170F"; 
  const geyColor = "#9B9B9B";
  const { buildHref } = useLinkBuilder();
    const icons = {
    tantara: ({ color }) => <Text style={{ color }}>T</Text>,
    mpiandraikitra: ({ color }) => <Text style={{ color }}>M</Text>,
    hafatra: ({ color }) => <Text style={{ color }}>H</Text>,
    fifandraisana: ({ color }) => <Text style={{ color }}>Fi</Text>,
    fikirana: ({ color }) => <Text style={{ color }}>F</Text>,
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
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
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
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

