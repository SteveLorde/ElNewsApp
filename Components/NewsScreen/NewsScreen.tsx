import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {News} from "../../Data/Models/News";
import {RSS} from "../../Data/Models/RSS";

export function NewsScreen() {
    const [news,setNews] = useState<RSS[]>([])

    function GetNews() {

    }



    return (
        <>
            <ScrollView>
                <TouchableOpacity onPress={() => GetNews() }>
                    <Text>Refresh</Text>
                </TouchableOpacity>
                {news.map( (rss : RSS) =>
                <View>
                    <Image></Image>
                    <View>
                        <Text>{rss.source}</Text>
                        <Text>{rss.published}</Text>
                        <Text>{rss.Title}</Text>
                    </View>
                </View>
                )}
            </ScrollView>
        </>
    );
}