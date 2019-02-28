import React,{Component} from 'react';
import {View, Text,ScrollView, StyleSheet , Image} from 'react-native';
import {Container, Header, Item, Button, Icon,Input, Content, Card, CardItem, Badge} from 'native-base';
export default class App extends Component
{
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      isError:false,
      error: '',
      movies: [],
      isLoading:true,
      limit : 10,
      currentPage : 1
    };
    this.data = [];
  }

  getMovies = () => {
    let query = this.state.searchText;
    let moviename = query.toLowerCase().trim();
    const Url= `https://yts.am/api/v2/list_movies.json?query_term=${moviename}&limit=${this.state.limit}&sort_by=year`;
    fetch(Url)
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.data.movie_count === 0)
          {
            this.setState({
              isError:true,
              error: "No Results Found",
              movies: []
            });
          }
          else{           
            this.setState({isError:false})
            movies = [];
            responseJson.data.movies.map( (movie) => {
              let film = {};
              film.key = movie.id;
              film.title = movie.title;
              film.summary = movie.summary;
              film.cover_img = movie.medium_cover_image;
              film.torrents = movie.torrents;
              film.year = movie.year;
              film.rating = movie.rating;
              film.mpa_rating = movie.mpa_rating;
              film.genre = []; 
              movie.genres.map((genre) => {
                film.genre.push(genre);
              });
              movies.push(film);
            });
            this.setState({
              
              movies : movies
            });
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
            { this.renderMovies() }
          </ScrollView>
       </Content>
     </Container>
    );
  }

  renderMovies(){
    return this.state.movies.map((movie) => {
      return(
        <Card key={movie.key}>
          <CardItem header>
            <Text style={{ fontSize:20, fontWeight: '600', color: '#333' }}>
              { movie.title }
            </Text>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri : movie.cover_img }} style={{ height : 200, width:null, flex : 1 }}/>
          </CardItem>
          <CardItem cardBody style={{ padding: 15, paddingTop : 20 }}>
            <Text style={{ color : '#333' }}> { movie.summary } </Text>
          </CardItem>
          <CardItem>
            {
              movie.genre.map((genre) => {
                return (
                  <Badge key={genre} style={{ backgroundColor : '#1abc9c', marginRight: 10, padding : 10 }}>  
                    <Text style={{ color : '#fff', fontSize : 15 }}> 
                      { genre } 
                    </Text> 
                  </Badge>);
              })
            }
          </CardItem>
          {
            movie.torrents.map( (torrent) => {
              return(
                  <Button key={torrent.hash} style={{margin:15}} full onPress={this.downloadTorrent(torrent)}>
                      <Text style={{color:'#fff', fontSize:18}}>{ 'Download '+torrent.quality + ', ' + torrent.size }</Text>
                  </Button>
              );
            })
          }
        </Card>
      )
    })
  }

  downloadTorrent(torrent){
    //alert(torrent.url);
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
