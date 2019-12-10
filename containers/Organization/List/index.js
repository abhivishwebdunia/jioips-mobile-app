import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { Card, CardItem, Body, ListItem, Left } from "native-base";
import { styles } from './style';
import Background from '../../Layout/Background';
import { storageService, httpService } from '../../../services';
import { loading, alertActions } from '../../../actions';

class List extends Component {


    constructor(props) {
        super(props);
        this.state = { orgList: null, orgCount: 0 };
    }

    async componentWillMount() {
        this.getList();
    }


    getList() {
        const { dispatch } = this.props;
        dispatch(loading(true));
        httpService.apiGet('/organization/1?start=0&limit=100').then((response) => {
            console.log("response", response);
            if (response.success) {

                this.setState({
                    orgList: response.data.subOrganizationDetails,

                });

                console.log("sdsds", this.state.orgList);
            }
            dispatch(loading(false));
        }, (error) => {
            dispatch(alertActions.error(error.toString()));
            dispatch(loading(false));
        });
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#eee',
                }}
            >
                <Background></Background>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>

                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 22,
                            }}
                        >
                            Organization List
              </Text>
                        <Card borderRadius={10} style={styles.card}>

                            <CardItem>

                                {this.state.orgList && <FlatList
                                    data={this.state.orgList}

                                    renderItem={rowData => {
                                        console.log("rowData", rowData);
                                        return (
                                            <ListItem onPress={() => { }}>
                                                
                                                <Body>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={styles.title}>
                                                            {rowData.item.organizationName}
                                                        </Text>
                                                        <Text style={styles.subtitle}>
                                                            Edit/Delete
                                                        </Text>
                                                    </View>
                                                </Body>
                                            </ListItem>
                                        );
                                    }}
                                />}

                            </CardItem>

                        </Card>



                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    }
}



export default connect(mapStateToProps)(List)
