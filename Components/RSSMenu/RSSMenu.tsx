import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {DeleteLinks} from "../../Services/RSSService/RSSService";

export function RSSMenu() {

    const [links,setLinks] = useState([])

    function openModal() {

    }

    function ClearLinks() {
        DeleteLinks()
        setLinks([])
    }

    return (
        <>
            <View>
                <TouchableOpacity onPress={() => AddLink() }>
                    <Text>Add News (RSS) Link</Text>
                </TouchableOpacity>
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