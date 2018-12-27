import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{

    constructor(props) {
        super(props);
        this.state= {isEditing: false, toDoValue: props.text};
    }

    static propTypes = {
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        id : PropTypes.string.isRequired,
        delteToDo : PropTypes.func.isRequired,
        uncompleteToDo : PropTypes.func.isRequired,
        completeToDo : PropTypes.func.isRequired,
    }

    state={
        isEditing: false,
        toDoValue: ""
    }

    render(){

        const {isEditing, toDoValue} = this.state;
        const {text, id, delteToDo, isCompleted} = this.props;

        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle,
                            isCompleted? 
                            styles.completedCircle : styles.uncompletedCircle
                        ]}>
                        </View>
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput 
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted?
                                styles.completedText : styles.uncompletedText
                            ]} 
                            value={toDoValue} 
                            multiline={true}
                            onChangeText={this._controlInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                        >

                        </TextInput>
                        ) : (
                        <Text style={[styles.text,
                            isCompleted?
                            styles.completedText : styles.uncompletedText]}>
                            {text}
                        </Text>
                        )
                    }
                </View>
                    {isEditing ? (
                        <View style={styles.action}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        <Entypo name="check" size={22} color="#F23657"/>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        ) : (
                        <View style={styles.action}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        <Entypo name="pencil" size={22} color={"black"}/>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={() => delteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>
                                        <Feather name="x" size={22} color="#F23657"/>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )
                    }
                </View>
        )
    }

    _toggleComplete = () => {
        const {isCompleted, uncompleteToDo, completeToDo,id} = this.props;
        if(isCompleted){
            uncompleteToDo(id);
        } else {
            completeToDo(id);
        }
    }

    _startEditing = () => {
        this.setState({
                isEditing: true,
            })
    }

    _finishEditing = () => {
        return(
            this.setState({
                isEditing: false
            })
        )
    }

    _controlInput = (text) => {
        this.setState({
            toDoValue: text
        })
    }
}

const styles =StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 15,
        marginLeft: 10
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle:{
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "300",
        fontSize: 20,
        marginVertical: 20,

    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width : width/2
    },
    action: {
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 10
    },
    actionContainer: {
        marginHorizontal: 5
    },
    input: {
        marginVertical: 15,
        width : width/2,
    }
})