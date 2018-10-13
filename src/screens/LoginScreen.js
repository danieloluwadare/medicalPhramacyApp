
import React, { Component } from 'react';
import { Platform, StyleSheet, ImageBackground, View, AsyncStorage,ActivityIndicator} from 'react-native';
import axios from 'react-native-axios'
import { 
  Container,
  Header, 
  Content, 
  Form,  
  Button, 
  Text,
  Body,
  Item as FormItem,
  Input,
  Label,
  Title,

  } from 'native-base';
  import {connect} from 'react-redux'
  
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
// });


class LoginScreen extends Component {
  // const {navigate} = this.props.navigation;
  constructor(props) {
    super(props)
    // this.state = { count: 0 }
    this.state = { 
      isloading:null,
      username: '',
      password: ''
    };
  }

  submit = async(x)=>{
    this.setState({isloading:true})
    options={headers: { 'Content-Type': 'application/json'}}
    let url='http://192.168.43.252:3000/api/auth';
    
    axios.post(url, {
      email: this.state.username,
      password: this.state.password,
    },options).
    then((response) => {
      console.log(response.data.token)
      this.props.updateToken(response.data.token)            
      this.setState({isloading:false}) 
      this.props.navigation.navigate('Drugs')
 
    }).
    catch((error)=>{console.log(error.response.data)})
    // console.log(x);
  }
  render() { 
    return (
      <View style={{flex:1}} >
        <ImageBackground source={require('./med1.png')}
        style={{flex:1}}
        >
          <View style={{flex:1, justifyContent:'center'}}>
            <Form>
  
              <Item stackedLabel>
                <Label>Email</Label>
                <Input onChangeText={(text) => this.setState({Username:text})}
                    value={this.state.username}  />
              </Item>
                    
              <Item stackedLabel>
                <Label>Password</Label>
                  <Input secureTextEntry={true} onChangeText={(text) => this.setState({password:text})} 
                  value={this.state.password}
                  />
              </Item>
                  {
                !this.state.isloading ?
                  (
                    <Button full primary style={{ paddingBottom: 4, marginTop:15,marginHorizontal:15,borderRadius:15 }} onPress={()=>this.submit("chk") }>
                     <Text> Login  </Text>
                    </Button>
                  ) :

                  (
                    <ActivityIndicator size="large" />
                  ) 

              }
              

            </Form>
          
          </View>
          
        </ImageBackground>
        
      </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)



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
