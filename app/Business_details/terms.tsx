import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';

export default function Terms() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showBlankPage, setShowBlankPage] = useState(false);

  const handleFinish = () => {
    if (!isChecked) return;
    router.push('/');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Terms and Conditions",
          headerShown: true
        }}
      />
      {showBlankPage ? (
        <View style={{ flex: 1, backgroundColor: 'white' }}></View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <View style={{ width: '100%', maxWidth: '100%', alignSelf: 'center' }}>
            {/* Header removed */}

            {/* Content */}
            <View style={{ padding: 16 }}>
              <View style={{ 
                backgroundColor: 'white', 
                borderRadius: 8, 
                padding: 20, 
                marginBottom: 24,
                shadowColor: '#93c5fd',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 4
              }}>
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: 16,
                  textAlign: 'center'
                }}>
                  Agreement
                </Text>
                
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20 }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </Text>
                </View>

                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
                    Why do we use it?
                  </Text>
                  <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20 }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                  </Text>
                </View>

                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
                    Where does it come from?
                  </Text>
                  <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20, marginBottom: 8 }}>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                  </Text>
                  <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20 }}>
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                  </Text>
                </View>
              </View>

              {/* Checkbox */}
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'flex-start', 
                marginBottom: 24
              }}>
                <TouchableOpacity 
                  onPress={() => setIsChecked(!isChecked)}
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: isChecked ? '#2563eb' : '#d1d5db',
                    borderRadius: 4,
                    backgroundColor: isChecked ? '#2563eb' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginTop: 2
                  }}
                >
                  {isChecked && <Check size={14} color="white" />}
                </TouchableOpacity>
                <Text style={{ fontSize: 14, color: '#4b5563' }}>
                  I accept all terms and conditions
                </Text>
              </View>

              {/* Finish Button */}
              <TouchableOpacity
                onPress={handleFinish}
                style={{
                  width: '100%',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: isChecked ? '#2563eb' : '#9ca3af',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }}
                disabled={!isChecked}
              >
                <Text style={{ 
                  color: 'white', 
                  fontWeight: '600', 
                  marginRight: 8
                }}>
                  Finish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}