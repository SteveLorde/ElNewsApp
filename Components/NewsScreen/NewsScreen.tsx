import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import { Image } from 'expo-image';
import {RSS} from "../../Data/Models/RSS";
import {GetRSS} from "../../Services/RSSService/RSSService";

export function NewsScreen() {
    const [news,setNews] = useState<RSS[]>([])

    async function GetNews() {
        let allnews = await GetRSS()
        setNews(allnews)
    }

    useEffect(() => {
        GetNews()
    }, []);


    return (
        <>
            <ScrollView style={{backgroundColor: '#191923' }}>
                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}} onPress={() => GetNews() }>
                    <Text  style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Refresh</Text>
                </TouchableOpacity>

                {news.map( (rss : RSS) =>
                <View style={{backgroundColor: '#'}}>
                    <View style={{flex :1, flexDirection: 'row',backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}}>
                        <Image source={rss.imageurl} style={{height: 100}} />
                        <View>
                            <Text style={{ color: 'white', fontSize: 16}}>{rss.source}</Text>
                            <Text style={{ color: 'white', fontSize: 16}}>{rss.published}</Text>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: '900'}}>{rss.Title}</Text>
                        </View>
                    </View>
                </View>
                )}
            </ScrollView>
        </>
    );
}