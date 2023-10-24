import {Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";

export function Navbar({navigation} : any) {

    const [switchbutton, setButton] = useState('RSS Menu')
    const [currentpage, setCurrentPage] = useState('NewsScreen')

    function navigatetoRSSMenuorBack() {
        if (currentpage == 'RSSMenu') {
            setCurrentPage('NewsScreen')
            navigation.goBack()
        }
        else if (currentpage == 'NewsScreen') {
            setCurrentPage('RSSMenu')
            navigation.navigate('RSSMenu')
        }
    }



    return (
        <>
            <View style={{backgroundColor: '#3d4866', height: 100, flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center', }}>
                <Text>ElNews App</Text>
                <TouchableOpacity onPress={ () => navigatetoRSSMenuorBack() }>{currentpage}</TouchableOpacity>
            </View>
        </>
    );
}