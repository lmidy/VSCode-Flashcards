import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { black, gray, blue } from '../utils/colors'
import CustomButton from './CustomButton';

class Deck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            opacity: new Animated.Value(0)
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params
        return {
            title: deckName
        }
    }

    componentDidMount() {
        const { opacity } = this.state
        Animated.timing(opacity, {toValue: 1, duration: 1000}).start()
    }

    render(){
        const { opacity } = this.state
        const { deckId } = this.props
        const { questions, title } = this.props.deck 
    
        return(
            <Animated.View style={[styles.deck, { opacity }]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.count}>{questions.length} {questions.length === 1 ? `card` : `cards`}</Text>
                <CustomButton
                    style={[styles.btn, ]}
                    onPress={() => this.props.navigation.navigate('AddCard', {deckId: deckId})}
                >
                     <Text style={styles.btnText}>Add Card</Text>
                </CustomButton>
                <CustomButton
                    onPress={() => (questions.length === 0 ? alert('Get started by adding few cards!') : this.props.navigation.navigate('Quiz', {deckId: deckId}))}
                >
                    <Text>Start Quiz!</Text>
                </CustomButton>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        margin: 10
            
    },
    title: {
        fontSize: 30,
        color: black
    },
    count: {
        marginTop: 10,
        fontSize: 25,
        color: gray
    },
    btn: {
        width: '100%',
        height: 40,
        padding: 10,
        backgroundColor: blue,
        borderRadius:7,
        marginTop: 10
    },
    btnText: {
        fontSize: 16,
        color: black
    }
  })
  
function mapStateToProps (state, {navigation}) {
    const { deckId } = navigation.state.params  
    return {
        deckId,
        deck: state[deckId],
    }
}

export default connect(mapStateToProps)(Deck)