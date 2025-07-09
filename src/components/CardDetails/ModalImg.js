import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from "@expo/vector-icons/Feather";
const ModalImg = ({isShow, setIsShow, poster_path}) => {
  return (
    <Modal visible={isShow} onRequestClose={() => setIsShow(false)}>
              <View style={styles.modal}>
                <ImageBackground
                  source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
                  style={styles.imgModal}
                  resizeMode="contain"
                >
                  <TouchableOpacity
                    style={styles.iconModal}
                    onPress={() => setIsShow(false)}
                  >
                    <Feather name="x-circle" size={35} color="#c55" />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </Modal>
  )
}

export default ModalImg

const styles = StyleSheet.create({

  modal: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  imgModal: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
  },
  iconModal: {
    position: "absolute",
    bottom: 50,
    right: "48%",
    color: "#c55",
  },
})