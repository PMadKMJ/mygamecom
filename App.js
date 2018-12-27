import React from 'react';
import { StyleSheet,
         Text, 
         View, 
         StatusBar, 
         TextInput, 
         Dimensions, 
         Platform,
         ScrollView } from 'react-native';
import ToDo from './ToDo';
import {AppLoading} from "expo";
import uuidv1 from "uuid/v1";

const {width, height} = Dimensions.get("window");


// component - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - -


export default class App extends React.Component {

  state={
    newToDo: "",
    loadedToDo: false,
    toDos : {}
  }

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const {newToDo, loadedToDo, toDos} =this.state;
    console.log(toDos)
    if(!loadedToDo){
      return <AppLoading/>;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"}></StatusBar>
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder={"New To Do"}
            placeholderTextColor={"#999"} 
            onChangeText={this._controlNewToDo}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          >
          </TextInput>
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo 
                key={toDo.id} 
                {...toDo} 
                delteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }


// function - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - -


  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    })
  };

  _loadToDos = () => {
    this.setState({
      loadedToDo: true
    })
  };

  _addToDo = () => {
    const {newToDo} = this.state;
    if(newToDo !== ""){
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        return {...newState};
      });
    }
  }

  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      return {...newState};
    })
  }

  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false 
          }
        }
      };
      return {...newState};
    });
  }

  _completeToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState,
          [id]: {
            ...prevState.toDos[id],
            isCompleted:true
          }
        }
      };
      return {...newState};
    });
  }
}

// css - - - - - - - - - - - - - - - - - - - - - - - - -- - - - - - - - - - -


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset:{
          height: -1,
          width:0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,

  },
  toDos:{
    alignItems: "center",
  },
});
