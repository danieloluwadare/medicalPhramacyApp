
import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View, TouchableHighlight,ActivityIndicator } from 'react-native';
import Url from './url';
import { 
  Container,
  Header, 
  Content, 
  Form,Button,Input,Label,Title, Thumbnail,
  Card, CardItem, Body,Icon,Right,Left
  } from 'native-base';
  import axios from 'react-native-axios'
  import {connect} from 'react-redux'  



class PatientsDetailScreen extends Component {
//  static navigationOptions = {
//    tab
//  }
  constructor(props) {
    super(props)
    this.state = { isloading:true, prescriptions:null}
  }

  componentWillMount=()=>{
    const{patient} = this.props.navigation.state.params
    this.setState({prescriptions:patient});
    this.setState({isloading:false})
    
  }

  // showDrugDetails = (x)=>{
  //   console.log(x)
  //   this.props.navigation.navigate('DrugDetails', { drug: x });
    
  // }

  dispenseDrug = (x)=>{
    this.setState({isloading:true})
    
    url=`http://192.168.43.252:3000/api/prescriptions/${x}`;
    axios.get(url,{headers: { 'Content-Type': 'application/json',"x-auth-token":this.props.token}})
    .then((response)=>{
      console.log(response.data);
      this.setState({prescriptions:response.data})
      this.setState({isloading:false})
      // this.props.navigation.navigate('PrescribeDrug', {patient:this.state.patient});
      
    } )
    
  }

  

  renderPatient= ()=>{
    
    if(this.state.isloading){
      return (
        <ActivityIndicator size="large" />
      )
    }

    const {_id,acquiredStatus,quantity,drugId,patientId,dosageId}=this.state.prescriptions    
    return (


      <View style={{flex:1}}>
      
        <View style={{flex:2,marginVertical:5, flexDirection:'column', justifyContent:"center", alignItems:'center'}} >
          <Thumbnail style={{width:180, height:180, borderRadius:90}} source= {require('./me.jpg')} />
          
        </View>


        <View>

        {
          !acquiredStatus ?
            (
              

              <Button full primary style={{ paddingBottom: 4, marginTop:15,marginHorizontal:15,borderRadius:15 }}   onPress={() => this.dispenseDrug(_id)}>
                <Text>DIspense Drug  </Text>
              </Button>
            ) :

            (
              
              <Button full primary style={{ paddingBottom: 4, marginTop:15,marginHorizontal:15,borderRadius:15 }}   onPress={() => console.log(_id)}>
                <Text>Has been dispensed  </Text>
              </Button>
            ) 

          }

          
        </View>
        
        <View >
          <Card>
            <CardItem header bordered>
              <Text style={{fontWeight:'bold', fontSize:15}} >Name</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={{fontStyle:'italic'}} >
                  {patientId.userId.firstname} {patientId.userId.lastname}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {patientId.userId.phoneNumber}
                </Text>
              </Body>
            </CardItem>

            <CardItem header bordered>
              <Text>Drug Name</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {drugId.name}
                </Text>
              </Body>
            </CardItem>            

            <CardItem header bordered>
              <Text>quantity</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                {quantity}
                </Text>
              </Body>
            </CardItem>

          </Card>
        </View>
      </View>
      
    )
        
  }

  render() { 
    return (
      <Container>
        <Header>
          <Left style={{flex:1}}>
            <Icon name="menu"></Icon>
          </Left>
          <Body style={{flex:1}}>
            <Text style={{textAlign:'center', fontWeight:'bold'}}>Prescription Details</Text>
          </Body>
          <Right style={{flex:1}}>
            <Icon name="person" ></Icon>
          </Right>
        </Header>
        <Content>
          {this.renderPatient()}
        </Content>

        
      
    </Container>
    );
  }
}

mapStateToProps = (state)=>{
  return{
    token:state.token
  }
}
mapDispatchToProps=(dispatch)=>{
  return{
    updateToken:(token)=>dispatch({type:'UPDATE_TOKEN', token})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PatientsDetailScreen)


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
