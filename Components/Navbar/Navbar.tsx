import {Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {selectedmenu, setmenutorss, setmenutonews} from "../../Services/GlobalStateStore/GlobalStateService";

export function Navbar({navigation} : any) {

    const [switchbutton, setButton] = useState('RSS Menu')
    const [pagetoswitch, setPageToSwitchTo] = useState("Rss Menu")

    function navigatetoRSSMenu() {
        setPageToSwitchTo("News Feed")
        navigation.navigate('RSSMenu')
    }

    function navigatetoNewsScreen() {
        setPageToSwitchTo("RSS Menu")
        navigation.navigate('NewsScreen')
    }

    function navigateMenu() {
        if (selectedmenu == "RSS Menu")
        {
            setmenutonews()
            navigatetoRSSMenu()
        }
        else if (selectedmenu == "News Feed") {
            setmenutorss()
            navigatetoNewsScreen()
        }
    }

    return (
        <>
            <View style={{backgroundColor: '#3d4866', padding: 20, height:110, flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{color: 'white', fontSize: 16, marginTop: 200}}>ElNews App</Text>
                <TouchableOpacity onPress={ () => navigateMenu() } style={{padding: 10, borderRadius: 20, backgroundColor: '#3d3866'}}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{selectedmenu}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}