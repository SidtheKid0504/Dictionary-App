import React from 'react';
import { 
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            word: 'Loading...',
            searchIsPressed: false,
            lexicalCategory: '',
            examples: [],
            definiton:''
        }
    }

    searchWord = (word) => {
        console.log(word)
        var loweredWord = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+loweredWord+".json"

        return fetch(url)
        .then((data) => {
            if(data.status === 200) {
                return data.json();
            }
            else {
                return null;
            }
        })
        .then((response) => {
            var responseObject = response;
            console.log(responseObject);
            if (responseObject) {
                var wordData = responseObject.definitions[0];
                var definiton = wordData.description;
                var lexicalCategory = word.wordtype;

                this.setState({
                    "word": this.state.text,
                    "definition": definiton,
                    "lexicalCategory": lexicalCategory
                });
            } else {
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found"
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputBox}
                    onChangeText={text => {
                        this.setState({
                            "text": text
                        });

                    }}
                    value={this.state.text}
                />
                <TouchableOpacity 
                    style={styles.searchWordButton}
                    onPress={ () => {
                        this.setState({
                            searchIsPressed: true
                        });
                        this.searchWord(this.state.text);
                    }}
                >
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        marginBottom: 200,
        width: '200%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        borderRadius: 25,
        outline: 'none'
    },
    searchWordButton: {
        width: '115%',
        height: 25,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'red'
    },
});