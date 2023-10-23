import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {DeleteLinks} from "../../Services/RSSService/RSSService";
import {AddModal} from "../AddRSSModal/AddModal";

export function RSSMenu() {

    const [links,setLinks] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    function ClearLinks() {
        DeleteLinks()
        setLinks([])
    }

    return (
        <>
            <View>
                <TouchableOpacity onPress={() => openModal() }>
                    <Text>Add News (RSS) Link</Text>
                </TouchableOpacity>

                <AddModal visible={modalVisible} CloseWindow={closeModal} />

                <TouchableOpacity onPress={() => ClearLinks() }>
                    <Text>Clear News Links</Text>
                </TouchableOpacity>

                <ScrollView>
                    {links.map( (link) =>
                        <View>
                            <Text>{link}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

        </>
    );
}