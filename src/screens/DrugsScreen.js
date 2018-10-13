
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator } from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content, 
  Form,Button,Input,Label,Title,
  Card, CardItem, Body,Icon,Right
  } from 'native-base';
  import axios from 'react-native-axios'
  



export default class DrugsScreen extends Component {

  constructor(props) {
    super(props)
    this.state = { count: 0, isloading:true, drugs:[]}
  }

  componentWillMount=()=>{
    url='http://192.168.43.252:3000/api/drugs';
    axios.get(url,{headers: { 'Content-Type': 'application/json' }}).then((response)=>{
      console.log(response.data);
      this.setState({drugs:response.data})
      this.setState({isloading:false})
    } )
  }

  showDrugDetails = (x)=>{
    console.log(x)
    this.props.navigation.navigate('DrugDetails', { drug: x });
    
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
                <TouchableHighlight onPress={() => this.showDrugDetails(item)}>
                  <Card key ={item._id}>
                    <CardItem>
                      <Text  style={{fontWeight:'bold',fontSize:15}} >
                        {item.name}
                      </Text>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
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
    return (
      <Container>
        <Header>
          <Body>
            <Title>Medical project!</Title>
          </Body>
        </Header>

        <Content>   
          {this.renderDrugs()}
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
