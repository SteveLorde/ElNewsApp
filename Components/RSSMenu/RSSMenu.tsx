import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {DeleteLinks, GetSources} from "../../Services/RSSService/RSSService";
import {AddModal} from "../AddRSSModal/AddModal";

export function RSSMenu() {

    const [links,setLinks] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false)
        GetSources()
    }

    async function GetLinks() {
        let links = await GetSources()
        setLinks(links)
    }

    function ClearLinks() {
        DeleteLinks()
        setLinks([])
    }

    useEffect(() => {
        GetLinks()
    }, []);

    return (
        <>
            <View>
                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10}} onPress={() => openModal() }>
                    <Text>Add News (RSS) Link</Text>
                </TouchableOpacity>

                <AddModal visible={modalVisible} CloseWindow={closeModal} />

                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10}} onPress={() => ClearLinks() }>
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