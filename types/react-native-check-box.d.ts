declare module 'react-native-check-box' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';

    interface CheckBoxProps {
        isChecked?: boolean;
        onClick?: () => void;
        leftText?: string;
        leftTextView?: React.ReactNode;
        rightText?: string;
        rightTextView?: React.ReactNode;
        leftTextStyle?: TextStyle;
        rightTextStyle?: TextStyle;
        style?: ViewStyle;
        checkBoxColor?: string;
        checkedImage?: React.ReactNode;
        unCheckedImage?: React.ReactNode;
        disabled?: boolean;
    }

    export default class CheckBox extends Component<CheckBoxProps> { }
} 