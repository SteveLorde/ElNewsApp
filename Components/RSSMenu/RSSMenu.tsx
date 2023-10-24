import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {DeleteLinks, GetSources} from "../../Services/RSSService/RSSService";
import {AddModal} from "../AddRSSModal/AddModal";
import {SourceLink} from "../../Data/Models/SourceLink";

export function RSSMenu({navigation} : any) {

    const [links,setLinks] = useState<SourceLink[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false)
        GetLinks()
    }

    async function GetLinks() {
        let links = await GetSources()
        setLinks(links)
    }

    async function ClearLinks() {
        await DeleteLinks()
        GetLinks()
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
                    {links.map( (link : SourceLink) =>
                        <View style={{backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}}>
                            <Text style={{color: 'white', fontSize: 18}}>{link.url}</Text>
                            <TouchableOpacity style={{backgroundColor: '', }}>
                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>

        </>
    );
}