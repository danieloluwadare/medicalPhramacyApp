
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator } from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content, 
  Form,Button,Input,Label,Title,
  Card, CardItem, Body,
  } from 'native-base';
  import axios from 'react-native-axios'
  



export default class DrugsDetailScreen extends Component {

  constructor(props) {
    super(props)
    this.state = { selectedDrugs:null}
  }

  componentWillMount=()=>{
    const{drug} = this.props.navigation.state.params
    this.setState({selectedDrugs:drug});
  }

  

  renderDrugs= ()=>{

    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    return (
      <FlatList
          data={this.state.drugs}
          renderItem={({item}) => {
              return(
                <TouchableHighlight onPress={() => this.goToNextScreen(item)}>
                  <Card>
                    <CardItem>
                      <Body>
                        <Text style={{fontWeight:'bold',fontSize:15}} >
                          {item.name}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableHighlight>
              )
            }
          }
        />
    )
      
  }
  

  render() { 
    const {name,taste,color,indication,mechanismOfAction,absorption,volumeOfDistribution,toxicity,
      affectedOrganisms    }=this.state.selectedDrugs
    return (
      <Container>
        <Header>
          <Body>
            <Title st> Drug Details</Title>
          </Body>
        </Header>

        <Content padder>
        <Card>
          <CardItem header bordered>
            <Text style={{fontWeight:'bold', fontSize:15}} >Name</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={{fontStyle:'italic'}} >
                {name}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Taste</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {taste}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>color</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {color}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>indication</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {indication}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Mechanism Of Action</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
               {mechanismOfAction}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Absorption</Text> 
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {absorption}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>volume Of Distribution</Text> 
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {volumeOfDistribution}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>toxicity</Text> 
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {toxicity}
              </Text>
            </Body>
          </CardItem>

          <CardItem header bordered>
            <Text>Affected Organism</Text> 
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                {affectedOrganisms}
              </Text>
            </Body>
          </CardItem>

          <CardItem footer bordered>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      </Content>
        
      
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
