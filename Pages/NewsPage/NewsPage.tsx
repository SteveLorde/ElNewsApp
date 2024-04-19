import {Animated, ScrollView, Text, TouchableOpacity, View, Linking} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import { Image } from 'expo-image';
import {RSS} from "../../Data/Models/RSS";
import {MainContext} from "../../Services/GlobalStateStore/MainContext";

export function NewsPage() {
    const {newsService} = useContext(MainContext)
    const [news,setNews] = useState<RSS[]>([])
    const fadeAnim = useRef(new Animated.Value(0)).current;

    async function GetNews() {
        let allnews = await newsService.GetRSS()
        setNews(allnews)
    }

    function DirectToURL(url : string) {
        Linking.openURL(url)
    }

    useEffect(() => {
        Animated.timing(fadeAnim,{toValue: 1, duration: 3000, useNativeDriver: true,}).start()
    }, []);

    return (
        <>
            <ScrollView style={{backgroundColor: '#191923' }}>
                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10, borderRadius: 20}} onPress={() => GetNews() }>
                    <Text  style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Refresh</Text>
                </TouchableOpacity>

                {news?.map( (rss : RSS) =>
                <View style={{backgroundColor: '#'}}>
                    <Animated.View style={{flex :1, flexDirection: 'row',backgroundColor: '#3d4866', margin: 10, borderRadius: 20, opacity: fadeAnim }}>
                        <TouchableOpacity key={rss.Title} style={{flexDirection: 'row', flex: 1}} onPress={ () => DirectToURL(rss.url) }>
                            <Image source={{uri: rss.imageurl}} style={{width: 100, maxHeight: 200 , borderRadius: 20 , marginRight: 10}} />
                            <View style={{ flex: 1, paddingRight: 10, paddingTop: 10 , paddingBottom: 10}}>
                                <Text style={{ color: 'white', fontSize: 12, margin:2}}>{rss.source}</Text>
                                <Text style={{ color: '#585865', fontSize: 10, margin:2}}>{rss.published}</Text>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '900', margin:2}}>{rss.Title}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                )}
                <View style={{backgroundColor: "#383e56", flex: 1, padding: 5, borderRadius: 20, margin: 10, height: 3}}>
                </View>
            </ScrollView>
        </>
    );
}