import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, typography, layout, components } from '../styles/GlobalStyles';

const GameScreen = ({ category, starter, onVote }) => {
    const [seconds, setSeconds] = useState(300);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        if (seconds <= 0) return;
        const interval = setInterval(() => {
            setSeconds(s => s - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
            <View style={styles.gameHeader}>
                <Text style={styles.headerText}>Kategoria:</Text>
                <Text style={styles.categoryText}>{category}</Text>
            </View>

            <Text style={[styles.timer, seconds === 0 && styles.timeUp]}>
                {seconds > 0 ? formatTime(seconds) : "KONIEC!"}
            </Text>

            <View style={styles.starterInfo}>
                <Text style={styles.headerText}>Zadawanie pytań zaczyna:</Text>
                <Text style={styles.starterName}>{starter}</Text>
            </View>
            
            <TouchableOpacity style={styles.btnVote} onPress={onVote}>
                <Text style={styles.btnVoteText}>GŁOSUJ</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    screen: { ...layout.screen, justifyContent: 'space-around' },
    gameHeader: {
        ...components.card,
    },
    headerText: {
        ...typography.p,
        color: colors.textSecondary,
    },
    categoryText: {
        ...typography.h2,
        color: colors.primary,
        marginTop: 5,
    },
    timer: {
        fontSize: 56,
        color: colors.primary,
        textAlign: 'center',
        fontWeight: '800',
        marginVertical: 30,
    },
    timeUp: {
        color: colors.danger,
    },
    starterInfo: {
        ...components.card,
    },
    starterName: {
        ...typography.h1,
        color: colors.text,
        marginTop: 5,
    },
    btnVote: {
        backgroundColor: colors.warning,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    btnVoteText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
    },
});

export default GameScreen;
