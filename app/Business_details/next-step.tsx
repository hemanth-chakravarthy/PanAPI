// app/next-step.tsx
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NextStepScreen() {
  return (
    <>
      <Stack.Screen
          options={{
            title: 'Step-3',
            headerTitleAlign: 'center',
          }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Next Step Screen</Text>
      </View>
    </>
  );
}