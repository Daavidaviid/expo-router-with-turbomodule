import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import NativeSampleModule from '../tm/NativeSampleModule';
import Animated, { useDerivedValue } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Page() {
  const textValue = useDerivedValue(() => {
    return NativeSampleModule.getFrenchHello();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{NativeSampleModule.reverseString('BONJOUR LES AMIS')}</Text>
      <Text style={styles.title}>
        {JSON.stringify(
          NativeSampleModule.passCustomType({
            enabled: true,
            key: 'key',
            timestamp: Date.now(),
          })
        )}
      </Text>

      <AnimatedTextInput style={styles.title} editable={false} value={textValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',

    paddingHorizontal: 20,
  },
});
