import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { images } from '../../constants';

const HeroSection = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={images.home_hero}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Dark Overlay */}
      <View style={styles.overlay} />

      {/* Overlay Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Keep Your City Clean</Text>
        <Text style={styles.subtitle}>
          Report waste, earn rewards & make a greener planet.
        </Text>
      </View>
    </View>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: 180,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  textContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E0E0',
  },
});
