import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {AddLink} from "../../Services/NewsService/NewsService";

export function AddModal({ visible, CloseWindow }) {

    const [inputValue, setInputValue] = useState('');

    function handleInputChange(text : string) {
        setInputValue(text)
    }

    async function SubmitSource() {
        await AddLink(inputValue)
        CloseWindow()
    }

    return (
        <>
            <Modal  animationType="slide" transparent={true} visible={visible} onRequestClose={CloseWindow}>
                <View style={{flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto', marginLeft: 20, marginRight: 20, backgroundColor: '#505ea6', borderRadius: 50, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 300, height: 'auto', backgroundColor: '#3d4866', padding: 10, margin: 10 , borderRadius: 20}} onPress={CloseWindow}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Close</Text>
                    </TouchableOpacity>

                    <TextInput style={{width: 300,backgroundColor: 'white', color: '#3d4866', borderColor: '#3d4866', borderWidth: 4, borderRadius: 50, padding: 10, }} onChangeText={handleInputChange} value={inputValue}/>

                    <TouchableOpacity style={{width: 300, height: 'auto', backgroundColor: '#3d4866', padding: 10, margin: 10 , borderRadius: 20}} onPress={ () => SubmitSource()}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}