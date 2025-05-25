import { Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { MainContext } from "../../services/GlobalStateStore/MainContext";

export function Navbar({ navigation }: any) {
  const { selectedPage, setSelectedPage } = useContext(MainContext);
  const [pageToSwitch, setPageToSwitchTo] = useState("Menu");

  function navigateToMenuPage() {
    setPageToSwitchTo("News");
    navigation.navigate("MenuPage");
  }

  function navigateToNewsPage() {
    setPageToSwitchTo("Menu");
    navigation.navigate("NewsPage");
  }

  function navigateMenu() {
    if (selectedPage === 0) {
      navigateToMenuPage();
    } else if (selectedPage == 1) {
      navigateToNewsPage();
    }
  }

  return (
    <>
      <View
        style={{
          backgroundColor: "#3d4866",
          padding: 20,
          height: 110,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, marginTop: 200 }}>
          ElNews App
        </Text>
        <TouchableOpacity
          onPress={() => navigateMenu()}
          style={{ padding: 10, borderRadius: 20, backgroundColor: "#3d3866" }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {pageToSwitch}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
