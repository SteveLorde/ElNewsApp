import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {DeleteLinks, GetSources} from "../../Services/RSSService/RSSService";
import {AddModal} from "../AddRSSModal/AddModal";

export function RSSMenu({navigation} : any) {

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

    function GoBack() {
        navigation.navigate('NewsScreen')
    }

    useEffect(() => {
        GetLinks()
    }, []);

    return (
        <>
            <View style={{backgroundColor: '#191923', flex: 1, flexDirection: 'column'}}>
                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}} onPress={ () => GoBack() }>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}} onPress={() => openModal() }>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Add News (RSS) Link</Text>
                </TouchableOpacity>

                <AddModal visible={modalVisible} CloseWindow={closeModal} />

                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}} onPress={() => ClearLinks() }>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Clear News Links</Text>
                </TouchableOpacity>

                <ScrollView style={{backgroundColor: '#191923'}}>
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