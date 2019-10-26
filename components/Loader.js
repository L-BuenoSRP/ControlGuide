import React, { Component } from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import styles from "../styles";
const Loader = props => {
  const { loading, ...attributes } = props;

  if (__DEV__) {
    return (
      <ActivityIndicator
        size="large"
        color="#7f0a0a"
        style={styles.indicatorLoaderScreenDev}
        animating={loading}
        hidesWhenStopped={true}
      />
    );
  }
  else {
    return (
      <Modal
        transparent={true}
        animationType={"none"}
        visible={loading}
        onRequestClose={() => {
          console.log("close modal");
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              size="large"
              color="#7f0a0a"
              style={styles.indicatorLoaderScreen}
              animating={loading}
            />
          </View>
        </View>
      </Modal>
    );
  };
}

export default Loader;
