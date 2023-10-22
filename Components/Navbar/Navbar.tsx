import {Text, View} from "react-native";
import {Link} from "expo-router";
import {useState} from "react";

export function Navbar() {

    const [switchbutton, setButton] = useState('RSS Menu')

    function changebutton() {
        setButton('Back')
    }

    return (
        <>
            <View>
                <Text>ElNews App</Text>
                <Link onPress={ () => changebutton() } href="../RSSMenu/">RSS Menu</Link>
            </View>
        </>
    );
}