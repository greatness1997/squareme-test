import { useState, useEffect } from "react"
import { Text, PermissionsAndroid, View, ToastAndroid, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, Modal, Dimensions, FlatList, Alert, Platform, ActivityIndicator } from "react-native"
import colors from "../../component/Colors"
import { s } from "react-native-size-matters"
import Ionicons from "react-native-vector-icons/Ionicons"
import Material from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "../../component/Button"
import { Formik } from 'formik';
import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'

const HEIGHT = Dimensions.get('window').height;

const PickUp = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [modalVisible3, setModalVisible3] = useState(false)
    const [subcategoriesVisible, setSubcategoriesVisible] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("")
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const [startText, setStartText] = useState('')


    useEffect(() => {
        requestLocationPermission()
        const timerId = setTimeout(() => {
            setModalVisible3(false);
        }, 5000);

        return () => clearTimeout(timerId);
    }, [])

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to provide location services.',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = async () => {
        try {
            const currentPosition = await Geolocation.getCurrentPosition(
                (position) => {
                    reverseGeocode(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    Platform.OS === "ios" ? Alert.alert("Error", `${error.message}`) : showToast(`${error.message}`);
                    
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (error) {
            Platform.OS === "ios" ? Alert.alert("Error", `${error.message}`) : showToast(`${error.message}`)
        }
    };

    const reverseGeocode = async (lat, long) => {
        try {
            const res = await Geocoding.from(lat, long);
            const address = res.results[0].formatted_address;
            setAddress(address);
        } catch (error) {
            Platform.OS === "ios" ? Alert.alert("Error", `${error.message}`) : showToast(`${error.message}`)
        }
    };

    const onChange = (selectedDate) => {
        setShow(false);
        if (!selectedDate) return;

        setDate(selectedDate);

        if (mode === 'selectDate') {
            setStartText(formatDate(selectedDate));
        }
        setMode('');
    };

    const showMode = (currentMode) => {
        setMode(currentMode);
        setShow(true);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return moment(date).format('ddd, MMM D, YYYY')

    };


    const close = () => {
        setModalVisible(false)
        setModalVisible2(false)
    }

    const handleContinue = () => {
        if (selectedCategory) {
            // Continue with your logic, e.g., navigate back
            setModalVisible(false)
        } else {
            Platform.OS === "ios" ? Alert.alert("Please select a subcategory") : showToast("Please select a subcategory.");
        }
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const categories = [
        "Pet Bottles",
        "Nylon",
        "Paper",
        "Bag",
        "Cartons",
        "Plastic"
    ]

    const toggleSubCategories = (category) => {
        setSubcategoriesVisible(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    }

    const renderItem = ({ item }) => {
        const isSubcategoryVisible = subcategoriesVisible[item];

        return (
            <TouchableOpacity onPress={() => toggleSubCategories(item)}>
                <View style={style.renderItemStyle}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: s(2) }}>
                        <Text style={{ color: colors.color3, fontSize: s(14), fontWeight: "500" }}>{item}</Text>
                        <Ionicons name="chevron-forward-outline" size={s(20)} color={colors.color3} />
                    </View>
                    <View style={{ backgroundColor: colors.color7, height: 1, marginTop: s(8), }}></View>
                    {isSubcategoryVisible && renderSubcategories()}
                </View>
            </TouchableOpacity>
        )
    }

    const renderSubcategories = () => {
        // For simplicity, I'm using dummy subcategories. Replace this with your actual subcategories logic.
        const subcategories = [
            "Transparent PET Bottles",
            "Green PET Bottles",
            "Other Colored PET Bottles",
            "Mix PET Bottles"
        ];

        return (
            <View style={{ marginLeft: s(10) }}>
                {subcategories.map((subcategory) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(subcategory)} key={subcategory} style={style.subcategoryStyle}>
                        <Text style={{ color: colors.color3, fontSize: s(14), marginRight: s(15) }}>{subcategory}</Text>
                        {subcategory === selectedCategory && <Ionicons name="checkmark-sharp" size={s(18)} color={colors.color1} />}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <>
            <SafeAreaView>
                <View style={style.container}>
                    <View style={style.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={style.iconContainer}>
                            <Ionicons name="chevron-back-outline" size={s(20)} color={colors.color3} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: "300", fontSize: s(15), color: colors.color3 }}>Schedule PickUp</Text>
                        <View></View>
                    </View>

                    <View style={{ marginTop: s(40) }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={style.serviceContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View>
                                    <Text style={{ fontWeight: "400", marginLeft: 5, color: colors.color1 }}>Category</Text>
                                    {selectedCategory !== "" ? <Text style={{ fontWeight: "500", marginLeft: 5, marginTop: 5, color: colors.color2, fontSize: s(12) }}>{selectedCategory}</Text> : <Text style={{ fontWeight: "300", marginLeft: 5, marginTop: 5, color: colors.color6, fontSize: s(12) }}>Enter your refered schedule date</Text>}
                                </View>
                            </View>

                            <Ionicons name="chevron-down-outline" size={s(20)} color={colors.color6} />
                        </TouchableOpacity>

                        <View style={style.serviceContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View>
                                    <Text style={{ fontWeight: "400", marginLeft: 5, color: colors.color1 }}>Waste Quantity</Text>
                                    <Text style={{ fontWeight: "300", marginLeft: 5, marginTop: 5, color: colors.color6, fontSize: s(12) }}>Enter your waste quantities</Text>
                                </View>
                            </View>

                            <Ionicons name="chevron-down-outline" size={s(20)} color={colors.color6} />
                        </View>

                        <TouchableOpacity onPress={() => showMode("selectDate")} style={style.serviceContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View>
                                    <Text style={{ fontWeight: "400", marginLeft: 5, color: colors.color1 }}>Schedule Date</Text>
                                    {startText !== "" ? <Text style={{ fontWeight: "500", marginLeft: 5, marginTop: 5, color: colors.color2, fontSize: s(12) }}>{startText}</Text> : <Text style={{ fontWeight: "300", marginLeft: 5, marginTop: 5, color: colors.color6, fontSize: s(12) }}>Enter your refered schedule date</Text>}
                                </View>
                            </View>

                            <Ionicons name="chevron-down-outline" size={s(20)} color={colors.color6} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={getCurrentLocation} style={style.serviceContainer}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View>
                                    <Text style={{ fontWeight: "400", marginLeft: 5, color: colors.color1 }}>PickUp Location</Text>
                                    {address !== "" ? <Text style={{ fontWeight: "500", marginLeft: 5, marginTop: 5, color: colors.color2, fontSize: s(12) }}>{address}</Text> : <Text style={{ fontWeight: "300", marginLeft: 5, marginTop: 5, color: colors.color6, fontSize: s(12) }}>Enter your pickup location</Text>}
                                </View>
                            </View>

                            <Ionicons name="chevron-down-outline" size={s(20)} color={colors.color6} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ padding: s(35) }}>
                        <Text style={{ alignSelf: "center", fontSize: s(13), fontStyle: "italic", color: colors.color3, textAlign: "center" }}>We've added a 10% to you waste schedule for your convenience</Text>
                    </View>

                    <View style={{ width: "90%", marginLeft: "5%" }}>
                        <Button title="Continue" onPress={() => setModalVisible2(true)} />
                    </View>
                </View>


                <Modal
                    visible={modalVisible}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={style.modalScreen}>
                        <View style={style.transparentContainer} />
                        <SafeAreaView style={style.contentContainer}>
                            <View style={style.closeIconContainer}>
                                <TouchableOpacity onPress={() => close()} style={style.iconContainer}>
                                    <Ionicons name="chevron-back-outline" size={s(20)} color={colors.color3} />
                                </TouchableOpacity>
                                <Text style={{ fontWeight: "300", fontSize: s(15), color: colors.color3 }}>Schedule Waste Category</Text>
                                <View></View>
                            </View>

                            <View style={{ padding: s(10), marginTop: s(10) }}>
                                <Text style={{ color: "grey" }}>
                                    Select each waste you'll like to pickup from the waste category
                                </Text>

                                <View style={{ width: "100%", marginBottom: s(10) }}>
                                    <Formik
                                        initialValues={{ category: "" }}
                                        enableReinitialize={true}
                                        onSubmit={(values) => {
                                            Schema.validate(values)
                                                .then((res) => {

                                                })
                                                .catch((err) => Alert.alert('Please provide proper details', err.message));
                                        }}>
                                        {(props) => {
                                            const { handleChange, values, handleSubmit } = props;

                                            return (
                                                <View>
                                                    <View style={style.searchContainer}>
                                                        <Material name="magnify" size={s(22)} color="grey" style={{ marginRight: s(10) }} />
                                                        <TextInput
                                                            style={style.input}
                                                            placeholder='Search for categories'
                                                            placeholderTextColor="grey"
                                                            onChangeText={(text) => {
                                                                handleChange('category')(text);
                                                                // filterBanks(text);
                                                            }}
                                                        // value={values.banks}
                                                        />
                                                    </View>
                                                </View>
                                            );
                                        }}
                                    </Formik>
                                </View>
                            </View>

                            {selectedCategory && (<View style={style.subCat}>
                                <Text style={{ color: colors.color3, fontSize: s(11), fontWeight: "500" }}>{selectedCategory}</Text>
                                <TouchableOpacity onPress={() => setSelectedCategory("")}>
                                    <Material name="close-circle" size={s(18)} />
                                </TouchableOpacity>
                            </View>)}

                            <View>
                                <FlatList
                                    data={categories}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item}
                                    numColumns={1}
                                />
                            </View>

                            <View style={{ width: "90%", marginLeft: "5%", marginTop: s(20) }}>
                                <Button title="Continue" onPress={handleContinue} />
                            </View>

                        </SafeAreaView>
                    </View>


                </Modal>

                <Modal
                    visible={modalVisible2}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={style.modalScreen2}>
                        <View style={style.transparentContainer2} />
                        <SafeAreaView style={style.contentContainer2}>
                            <View style={{ height: s(3), width: s(50), backgroundColor: colors.color6, alignSelf: "center" }}></View>
                            <View style={style.closeIconContainer2}>
                                <Text style={{ fontWeight: "600", fontSize: s(15), color: colors.color3 }}>Schedule PickUp</Text>
                                <TouchableOpacity onPress={() => close()} style={style.iconContainer2}>
                                    <Ionicons name="close" size={s(20)} color={colors.color6} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ padding: s(20) }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "600", marginRight: s(10), color: colors.color3 }}>Waste Quantity:</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={style.cat}>
                                            <Text style={{ color: colors.color5 }}>{selectedCategory}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: s(15) }}>
                                    <Text style={{ fontWeight: "600", marginRight: s(10), color: colors.color3 }}>Waste Quantity:</Text>
                                    <Text style={{ color: "grey" }}>5bags</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: s(15) }}>
                                    <Text style={{ fontWeight: "600", marginRight: s(10), color: colors.color3 }}>Shedule Date:</Text>
                                    <Text style={{ color: "grey" }}>{startText}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: s(15) }}>
                                    <Text style={{ fontWeight: "600", marginRight: s(10), color: colors.color3 }}>Pickup Location:</Text>
                                    <Text style={{ color: "grey" }}>Gbagada Phase II, HK</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: s(15) }}>
                                    <Text style={{ fontWeight: "600", marginRight: s(10), color: colors.color3 }}>Reminder:</Text>
                                    <Text style={{ color: "grey" }}>{startText}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: s(15) }}>
                                    <Ionicons name="checkbox" size={s(20)} color={colors.color1} />
                                    <Text style={{ fontWeight: "600", marginLeft: s(7), color: colors.color3 }}>Call me on arrival</Text>

                                </View>
                            </View>

                            <View style={{ width: "90%", marginLeft: "5%", marginTop: s(20) }}>
                                <Button title="Continue Request" onPress={() => setModalVisible3(true)} />
                            </View>

                        </SafeAreaView>
                    </View>


                </Modal>

                <Modal
                    visible={modalVisible3}
                    animationType='slide'
                    transparent={true}
                >
                    <View style={style.modalScreen3}>
                        <View style={style.transparentContainer3} />
                        <SafeAreaView style={style.contentContainer3}>
                            <ActivityIndicator size={s(100)} color={colors.color1} />
                            <View style={{ width: "80%", marginTop: s(20), alignSelf: "center" }}>
                                <Text style={{ fontSize: s(14), fontWeight: "600", marginLeft: s(7), alignSelf: "center", marginBottom: s(5), color: colors.color1 }}>Submitting request</Text>
                                <Button title="Cancel Request" onPress={() => setModalVisible3(false)} />
                            </View>

                        </SafeAreaView>
                    </View>


                </Modal>

                {show && (
                    <DateTimePickerModal
                        isVisible={show}
                        mode="date"
                        date={date}
                        onConfirm={onChange}
                        onCancel={() => setShow(false)}
                    />
                )}
            </SafeAreaView>
        </>

    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    iconContainer: {
        width: s(30),
        height: s(30),
        backgroundColor: colors.color4,
        borderRadius: s(10),
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer2: {
        width: s(25),
        height: s(25),
        backgroundColor: colors.color4,
        borderRadius: s(50),
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: s(10)
    },
    serviceContainer: {
        borderColor: colors.color1,
        borderWidth: 1,
        width: "90%",
        height: 60,
        borderRadius: 10,
        padding: 5,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingLeft: 20
    },
    modalScreen: {
        flex: 1,
    },
    transparentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: HEIGHT,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: s(10),
        paddingVertical: s(20),

    },
    closeIconContainer: {
        marginLeft: s(10),
        marginBottom: s(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },

    modalScreen2: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    transparentContainer2: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer2: {
        flex: s(1.5),
        backgroundColor: '#f5f5f5',
        paddingHorizontal: s(10),
        paddingVertical: s(20),
        borderTopLeftRadius: s(20),
        borderTopRightRadius: s(20),

    },
    closeIconContainer2: {
        marginTop: s(30),
        marginLeft: s(10),
        marginBottom: s(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },

    modalScreen3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    contentContainer3: {
        width: '90%',
        // height: s(250),
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: s(20)
    },

    // modalScreen3: {
    //     flex: 1,
    //     backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // },
    // transparentContainer3: {
    //     flex: 1,
    //     backgroundColor: 'transparent',
    // },
    // contentContainer3: {
    //     flex: s(1.5),
    //     backgroundColor: '#f5f5f5',
    //     paddingHorizontal: s(10),
    //     paddingVertical: s(20),
    //     borderTopLeftRadius: s(20),
    //     borderTopRightRadius: s(20),

    // },
    // closeIconContainer3: {
    //     marginTop: s(30),
    //     marginLeft: s(10),
    //     marginBottom: s(10),
    //     flexDirection: 'row',
    //     justifyContent: "space-between",
    //     alignItems: "center"
    // },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: s(1),
        borderColor: colors.color1,
        paddingBottom: s(1),
        width: '100%',
        marginTop: s(20),
        height: s(40),
        paddingLeft: s(10),
        borderRadius: s(5),
        backgroundColor: colors.color5
    },

    input: {
        flex: 1,
        color: "black"
    },

    renderItemStyle: {
        backgroundColor: colors.color5,
        padding: s(10),
        width: "95%",
        marginLeft: "3%",

    },
    subcategoryStyle: {
        padding: s(5),
        paddingLeft: s(10),
        backgroundColor: colors.color5,
        marginTop: s(5),
        flexDirection: "row",
    },

    subCat: {
        height: s(30),
        width: "50%",
        padding: s(5),
        backgroundColor: colors.color6,
        marginLeft: "4%",
        marginBottom: s(10),
        borderRadius: s(20),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    cat: {
        backgroundColor: colors.color2,
        height: s(20),
        paddingRight: s(10),
        paddingLeft: s(10),
        borderRadius: s(10),
        marginRight: s(10)
    }

})

export default PickUp