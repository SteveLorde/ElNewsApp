import {Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";

export function Navbar({navigation} : any) {

    const [switchbutton, setButton] = useState('RSS Menu')
    const [pagetoswitch, setPageToSwitchTo] = useState('RSSMenu')

    function navigatetoRSSMenu() {
            navigation.navigate('RSSMenu')
    }

    function navigatetoNewsScreen() {
        navigation.navigate('NewsScreen')
    }

    return (
        <>
            <View style={{backgroundColor: '#3d4866', padding: 20, height:110, flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{color: 'white', fontSize: 16}}>ElNews App</Text>
                <TouchableOpacity onPress={ () => navigatetoRSSMenu() } style={{padding: 10, borderRadius: 20, backgroundColor: '#3d3866'}}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>RSS Menu</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}