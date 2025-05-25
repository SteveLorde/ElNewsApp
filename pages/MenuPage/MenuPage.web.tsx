import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AddModal } from "../../components/AddRSSModal/AddModal";
import { newsSource } from "../../data/Models/NewsSource";
import { MainContext } from "../../services/GlobalStateStore/MainContext";

export function MenuPage({ navigation }: any) {
  const { newsService } = useContext(MainContext);

  const [links, setLinks] = useState<newsSource[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    GetLinks();
  };

  async function GetLinks() {
    let links = await newsService.GetSources();
    setLinks(links);
  }

  async function ClearLinks() {
    await newsService.DeleteLinks();
    GetLinks();
  }

  async function DeleteLink(linkid: number) {
    await newsService.DeleteLinkFromDatabase(linkid);
    GetLinks();
  }

  function EditLink(linkname: string) {}

  function GoBack() {
    navigation.navigate("NewsScreen");
  }

  useEffect(() => {
    GetLinks();
  }, []);

  return (
    <>
      <View
        style={{ backgroundColor: "#191923", flex: 1, flexDirection: "column" }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#3d4866",
            padding: 10,
            margin: 10,
            borderRadius: 20,
          }}
          onPress={() => openModal()}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Add News (RSS) Link
          </Text>
        </TouchableOpacity>

        <AddModal visible={modalVisible} CloseWindow={closeModal} />

        <TouchableOpacity
          style={{
            backgroundColor: "#3d4866",
            padding: 10,
            margin: 10,
            borderRadius: 20,
          }}
          onPress={() => ClearLinks()}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Clear News Links
          </Text>
        </TouchableOpacity>

        <ScrollView style={{ backgroundColor: "#191923" }}>
          {links.map((link: newsSource) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#3d4866",
                padding: 15,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => DeleteLink(link.id)}>
                <Text style={{ color: "white", fontSize: 18 }}>{link.url}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => DeleteLink(link.id)}
                style={{
                  backgroundColor: "#de3838",
                  padding: 10,
                  margin: 5,
                  borderRadius: 100,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "900" }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
