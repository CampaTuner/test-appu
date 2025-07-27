import { memo, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import COLORS from '../constants/colors';
import FONTS from '../constants/fonts';
import * as Animatable from 'react-native-animatable';

// Animations
const animateIn = { 0: { scale: 0.9, translateY: 6 }, 1: { scale: 1.2, translateY: -16 } };
const animateOut = { 0: { scale: 1.2, translateY: -16 }, 1: { scale: 1, translateY: 6 } };
const circleIn = { 0: { scale: 0 }, 1: { scale: 1 } };
const circleOut = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = memo(({ item, onPress, ['aria-selected']: isSelected }) => {
    const iconRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);
    const Icon = item.type;

    useEffect(() => {
        if (isSelected) {
            iconRef.current?.animate(animateIn, 400);
            circleRef.current?.animate(circleIn, 400);
            textRef.current?.transitionTo({ opacity: .8, scale: 1 }, 400);
        } else {
            iconRef.current?.animate(animateOut, 400);
            circleRef.current?.animate(circleOut, 400);
            textRef.current?.transitionTo({ opacity: 0, scale: 0.5 }, 400);
        }
    }, [isSelected]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={styles.tabButton}
        >
            <Animatable.View
                ref={iconRef}
                duration={400}
                useNativeDriver
                style={styles.tabInner}
            >
                <View style={styles.iconWrapper}>
                    <Animatable.View
                        ref={circleRef}
                        style={[StyleSheet.absoluteFillObject, styles.circle]}
                        useNativeDriver
                    />
                    <Icon
                        name={item.activeIcon}
                        size={22}
                        color={isSelected ? COLORS.primary : 'white'}
                    />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={styles.label}
                    useNativeDriver
                >
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    );
});

export default TabButton

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabInner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        backgroundColor: 'white',
        borderRadius: 25,
    },
    label: {
        fontSize: 10,
        fontFamily: FONTS.semiBold,
        color: 'white',
        marginTop: 0,
        opacity: 0,
        transform: [{ scale: 0.5 }],
    },
})