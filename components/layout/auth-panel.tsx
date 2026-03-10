import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useAuth } from "react-oidc-context";

import { AuthConstants } from '@/constants/auth';

type AuthPanelProps = {
    compact: Boolean
}

export function AuthPanel({ compact = false }: AuthPanelProps) {
    const auth = useAuth();
    const router = useRouter();
    const signOutRedirect = () => {
        let newLocation = `${AuthConstants.cognitoDomain}/logout?client_id=${AuthConstants.clientId}&logout_uri=${encodeURIComponent(AuthConstants.logoutUri)}`;
        window.location.href = newLocation;
    };

    const moveToAuthPage = () => {
        router.push('/auth');
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.isAuthenticated) {
        if (auth.user?.id_token) {
            sessionStorage.setItem("idToken", auth.user?.id_token);
        }
        return (
            <>
                <Pressable
                    onPress={() => {
                        moveToAuthPage();
                    }}
                    style={[styles.authButton, compact && styles.authButtonCompact]}>
                    <Text style={styles.authText}>Auth</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        auth.removeUser();
                        signOutRedirect();
                    }}
                    style={[styles.authButton, compact && styles.authButtonCompact]}>
                    <Text style={styles.authText}>Sing Out</Text>
                </Pressable>
            </>
        );
    } else {
        return (
            <Pressable
                onPress={() => auth.signinRedirect()}
                style={[styles.authButton, compact && styles.authButtonCompact]}>
                <Text style={styles.authText}>Sing in / Sing up</Text>
            </Pressable>
        );
    }

}

const styles = StyleSheet.create({
    authButton: {
        borderWidth: 3,
        borderColor: '#101010',
        borderRadius: 14,
        backgroundColor: '#f3f3f3',
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    authButtonCompact: {
        alignSelf: 'flex-start',
    },
    authText: {
        color: '#191919',
        fontSize: 15,
        fontWeight: '600',
    },
});
