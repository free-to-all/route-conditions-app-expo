// @flow
import React, {useRef} from 'react';

import {
    TextInput, View, Button, StyleSheet, KeyboardAvoidingView,
} from 'react-native';

export function LoginScreen ( props ) {
    const [email, setEmail] = React.useState( '' );
    const [password, setPassword] = React.useState( '' );

    const ref_passowrd = useRef();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={{margin: 10}}>
                <TextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => ref_passowrd.current.focus()}
                    returnKeyType={"next"}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    ref={ref_passowrd}
                    onSubmitEditing={() => props.onLogin( email, password )}
                />
                <Button title="Sign in" onPress={() => {
                    props.onLogin( email, password )
                }
                }/>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
} )