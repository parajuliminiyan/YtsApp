import React,{Component} from 'react';
import {View, Text,ScrollView,FlatList, StyleSheet,FlatListItem} from 'react-native';
import {Container, Header, Item, Button, Icon,Input, Content, List, ListItem, Left, Thumbnail, Body, Card, CardItem} from 'native-base';
export default class App extends Component
{
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      isError:false,
      error: '',
      dataSource: [],
      isLoading:true,
      title:''
    };
    this.data = [];
  }

  getMovies = () => {
    let query = this.state.searchText;
    let moviename = query.toLowerCase().trim();
    const Url= `https://yts.am/api/v2/list_movies.json?query_term=${moviename}&limit=10&sort_by=year`;
    fetch(Url)
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.data.movie_count === 0)
          {
            this.setState({
              isError:true,
              error: "No Results Found",
              dataSource: ''
            });
          }
          else{           
            this.setState({isError:false})
            
            // let title = ''
            // for(i=0; i<=responseJson.data.movies.length; i++)
            // {
            //   title += responseJson.data.movies[i].title;
              
            // }

            this.setState({
              dataSource:responseJson.data.movies,
              title: title
            })
          }
      })
      .catch((error) => {
        console.error(error);
      })

  }
  
  render()
  {
   
    const khalii = <View><Text></Text></View>
    const Error = <View><Text style={{fontSize:20, color:'red'}}>{this.state.error}</Text></View>
    return(
     <Container>
       <Header searchBar rounded>
       <Item> 
            <Icon name="ios-search" />
            <Input placeholder="Search" 
              onChangeText={(text) => this.setState({searchText:text})} />
          </Item>
       </Header>
       <Content>
       <Button style={{margin:15}} full onPress={this.getMovies}>
            <Text style={{color:'#fff', fontSize:18}}>Search</Text>
        </Button>
          {this.state.isError === true ? Error: khalii }
         <ScrollView style={styles.container}>
            <Text>{this.state.dataSource}</Text>
         </ScrollView>
       </Content>
     </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    margin:10,
    backgroundColor: "#F5FCFF"
  }
});