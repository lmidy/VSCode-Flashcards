  
import React from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'
import DeckList from './DeckList'
import { white } from '../utils/colors';

class Decks extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }        
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
        .then((decks) => dispatch(receiveDecks(decks)))
        .then(() => this.setState(() => ({loading: false})))
    }

    render(){
        const { loading } = this.state
        const { decks } = this.props
        if(loading === true)
            return <AppLoading />

        return(
            <View style={styles.container}>
              <Text style={styles.title}> Mobile FlashCards </Text>
                <FlatList
                 data={Object.keys(decks).map((id) => { return { key: id } })}
                 renderItem={({item}) => (
                    <DeckList key={item.key} id={item.key}/>
                 )}
                />
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      backgroundColor: white
    },
    block: {
      marginBottom: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: "bold",
    }
  });