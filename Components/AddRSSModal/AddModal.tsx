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
            <Modal  animationType="slide" transparent={true} visible={visible} onRequestClose={CloseWindow}>
                <TouchableOpacity onPress={CloseWindow}>
                    <Text>Close</Text>
                </TouchableOpacity>

                <TextInput onChangeText={handleInputChange} value={inputValue}/>

                <TouchableOpacity onPress={ () => SubmitSource()}>
                    <Text>Submit</Text>
                </TouchableOpacity>

            </Modal>
        </>
    );
}