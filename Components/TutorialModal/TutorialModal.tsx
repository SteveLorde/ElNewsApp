import {Button, Modal, ScrollView, View, StyleSheet} from "react-native";
import {createRef, useRef, useState} from "react";
import {Image} from "expo-image";

export function TutorialModal({isVisible,CloseTutorial}) {

    const [activeImage, setActiveImage] = useState(0);

    function handleScrollImageChange(imageNumber : number) {
    }

    const scrollViewRef = useRef(null)

    return (
        <>
            <Modal style={tutorialstyle.modal} visible={isVisible}>
                <View style={tutorialstyle.tutorialcontainer}>
                    <View>
                        <ScrollView style={tutorialstyle.tutorialscroller} ref={scrollViewRef}>
                            {/*FILL IMAGE SOURCE WITH LOCATION OF TUTORIAL IMAGES*/}
                            <Image source={""} style={tutorialstyle.image} />
                        </ScrollView>

                    </View>
                    <Button title={"Close Tutorial"} onPress={() => CloseTutorial}/>
                </View>
            </Modal>

        </>
    );
}


const tutorialstyle = StyleSheet.create({
    modal : {

    },
    tutorialcontainer : {
        flexDirection: "column",
        gap: 10
    },
    tutorialscroller : {

    },
    image : {

    },

})