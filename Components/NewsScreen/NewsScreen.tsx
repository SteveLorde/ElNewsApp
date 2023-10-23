import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {RSS} from "../../Data/Models/RSS";
import {GetRSS} from "../../Services/RSSService/RSSService";

export function NewsScreen() {
    const [news,setNews] = useState<RSS[]>([])

    async function GetNews() {
        let allnews = await GetRSS()
        setNews(allnews)
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