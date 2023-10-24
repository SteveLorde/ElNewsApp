import {Alert, Modal, Text, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {AddLink} from "../../Services/RSSService/RSSService";

export function AddModal({ visible, CloseWindow }) {

    const [inputValue, setInputValue] = useState('');

    function handleInputChange(text : string) {
        setInputValue(text)
    }

    async function SubmitSource() {
        let check = await AddLink(inputValue)
        if (check) {
            CloseWindow()
        }
        else {
            Alert.alert("ADDING LINk FAILED")
        }
    }

    return (
        <>
            <Modal  animationType="slide" style={{ backgroundColor: 'white', padding: 20}} transparent={true} visible={visible} onRequestClose={CloseWindow}>
                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10}} onPress={CloseWindow}>
                    <Text>Close</Text>
                </TouchableOpacity>

                <TextInput style={{color: '#3d4866', borderColor: '#3d4866', padding: 10, borderRadius: 20}} onChangeText={handleInputChange} value={inputValue}/>

                <TouchableOpacity style={{backgroundColor: '#3d4866', padding: 10, margin: 10}} onPress={ () => SubmitSource()}>
                    <Text>Submit</Text>
                </TouchableOpacity>

            </Modal>
        </>
    );
}