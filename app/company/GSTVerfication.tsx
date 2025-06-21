// screens/Step4GstScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useRouter } from 'expo-router';
import { RootStackParamList } from '../../types/navigation';

const Step4GstScreen: React.FC = () => {
    const router = useRouter();
    const [gstNumber, setGstNumber] = useState('');
    const [declaration, setDeclaration] = useState(false);
    const [reason, setReason] = useState<'20L' | 'intra' | 'exempt'>('20L');

    const RadioButton = ({ selected, onPress, label }: { selected: boolean; onPress: () => void; label: string }) => (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={styles.radioOuter}>
                {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Company GST Details</Text>
            <Text style={styles.label}>Enter GST Number</Text>
            <TextInput
                style={styles.input}
                placeholder="KFFOO####H"
                value={gstNumber}
                onChangeText={setGstNumber}
            />
            <TouchableOpacity style={styles.verifyButton}>
                <Text style={styles.verifyText}>Verify GST details</Text>
            </TouchableOpacity>
            <Text style={styles.sectionLabel}>GST mandatory unless exempt</Text>
            <RadioButton
                selected={reason === '20L'}
                onPress={() => setReason('20L')}
                label="Turnover below ₹20L"
            />
            <RadioButton
                selected={reason === 'intra'}
                onPress={() => setReason('intra')}
                label="Only intra-state sales"
            />
            <RadioButton
                selected={reason === 'exempt'}
                onPress={() => setReason('exempt')}
                label="Selling exempt products"
            />
            <View style={styles.checkboxContainer}>
                <CheckBox isChecked={declaration} onClick={() => setDeclaration(!declaration)} />
                <Text> I declare that I am not required to register under GST laws as my turnover is below the prescribed limit.</Text>
            </View>
            <TouchableOpacity
                disabled={!declaration}
                style={[styles.nextButton, !declaration && { backgroundColor: '#ccc' }]}
                onPress={() => router.push('/company/Uploading')}
            >
                <Text style={styles.nextText}>Proceed to next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Step4GstScreen;

const styles = StyleSheet.create({
    container: { padding: 20 },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333'
    },
    sectionLabel: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333'
    },
    input: { borderWidth: 1, borderColor: 'purple', padding: 10, marginBottom: 10, borderRadius: 10 },
    verifyButton: { backgroundColor: '#000', padding: 12, borderRadius: 8 },
    verifyText: { color: '#fff', textAlign: 'center' },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        paddingVertical: 4
    },
    radioOuter: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    radioInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: 'purple'
    },
    radioText: {
        fontSize: 16,
        color: '#333'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15
    },
    nextButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#947288',
        borderRadius: 8
    },
    nextText: {
        color: '#fff',
        textAlign: 'center'
    }
});