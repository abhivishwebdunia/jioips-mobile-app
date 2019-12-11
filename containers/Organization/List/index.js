import React, { Component } from 'react';
import { Text, View, RefreshControl, Modal, Alert, Button, TouchableOpacity,ActivityIndicator, TouchableHighlight, FlatList, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import { Card, CardItem, Body, ListItem, Left } from "native-base";
import { styles } from './style';
import Background from '../../Layout/Background';
import { storageService, httpService } from '../../../services';
import { loading, alertActions } from '../../../actions';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ConfirmDialog } from 'react-native-simple-dialogs';
const validationSchema = yup.object().shape({
    organizationName: yup
        .string()
        .label('Organization Name')
        .min(6)
        .required(),

});
class List extends Component {


    constructor(props) {
        super(props);
        this.page = 1;
        this.limit=5;
        this.state = { orgList: [], orgCount: 0,loadMore:false,isRefreshing:false, selDelete: null, modalVisible: false, organizationName: '', deleteVisible: false };
    }

    componentWillMount() {
        console.log("WILL MOUNT");
        this.getList();
    }


    getList(page=1) {
        console.log("CURRENT PAGE",page);
        const { dispatch } = this.props;
        dispatch(loading(true));
        let start = (page - 1) * this.limit;

        httpService.apiGet('/organization/1?start='+start+'&limit='+this.limit).then((response) => {
            console.log("response", response);
            if (response.success) {
                let listData = this.state.orgList;
                let data = listData.concat(response.data.subOrganizationDetails);
                this.setState({ orgList:data,loadMore:false,isRefreshing:false });
            }
            dispatch(loading(false));
        }, (error) => {
            dispatch(alertActions.error(error.toString()));
            dispatch(loading(false));
        });
    }

    dbSubmit = (values, actions) => {
        // this.props.dispatch(AuthActions.login(values.organizationName, values.userPassword))
        const { dispatch } = this.props;
        dispatch(loading(true));
        httpService.apiPost('/organization', values).then((response) => {
            console.log("response", response);
            dispatch(loading(false));
            if (response.success) {
                dispatch(alertActions.success(response.message));
                this.setState({ modalVisible: false });
                this.getList();
            }

        }, (error) => {
            dispatch(alertActions.error(error.toString()));
            dispatch(loading(false));
        });
    }


    deleteData = (rowData) => {
        // this.props.dispatch(AuthActions.login(values.organizationName, values.userPassword))
        if (this.state.selDelete) {
            const { dispatch } = this.props;
            dispatch(loading(true));
            let param = [{ organizationId: this.state.selDelete.organizationId }];
            httpService.apiPost('/bulkorganization', param).then((response) => {
                console.log("response", response);
                dispatch(loading(false));
                if (response.success) {
                    dispatch(alertActions.success(response.message));
                    this.setState({ deleteVisible: false, selDelete: null });
                    this.getList();
                }

            }, (error) => {
                dispatch(alertActions.error(error.toString()));
                dispatch(loading(false));
            });
        }

    }
    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
         if (!this.state.loadMore) return null;
         return (
           <ActivityIndicator
             style={{ color: '#000' }}
           />
         );
       };
    
       
    handleLoadMore = () => {
        console.log("CALL loadMore",this.state.loadMore);
        if (!this.state.loadMore) {

        this.page = this.page + 1; // increase page by 1
        this.setState({loadMore:true});
        this.getList(this.page); // method for API call 
        }
    };

    onRefresh() {
        console.log("REFRESHHH");
        this.page=1;
        this.setState({ isRefreshing: true,orgList:[] }); // true isRefreshing flag for enable pull to refresh indicator
        this.getList(1);
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
                
                    <View style={styles.container}>

                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 22,
                            }}
                        >
                            Organization List
                        </Text>
                        <Button onPress={() => this.setState({ modalVisible: true })} style={styles.addButton} title="Add"/>
                        <Card borderRadius={10} style={styles.card}>

                            <CardItem>

                                {this.state.orgList && <View style={{flex: 1}}><FlatList
                                    data={this.state.orgList}
                                    extraData={this.state}
                                    refreshControl={
                                        <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                    ListFooterComponent={this.renderFooter.bind(this)}
                                    onEndReachedThreshold={0.01}
                                    onEndReached={this.handleLoadMore.bind(this)}
                                    renderItem={rowData => {
                                        console.log("rowData", rowData);
                                        return (
                                            <ListItem onPress={() => { }}>

                                                <Body>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={styles.title}>
                                                            {rowData.item.organizationName}
                                                        </Text>
                                                        <Button style={styles.button} title="Edit"><Text>Edit</Text></Button>
                                                        <Button style={styles.button} onPress={() => this.setState({ selDelete: rowData.item, deleteVisible: true })} title="Delete"><Text>Delete</Text></Button>
                                                    </View>
                                                </Body>
                                            </ListItem>
                                        );
                                    }}
                                /></View>}

                            </CardItem>

                        </Card>

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <Formik
                                initialValues={{
                                    organizationName: ''
                                }}
                                onSubmit={this.dbSubmit}
                                validationSchema={validationSchema}
                            >
                                {formikProps => (

                                    <React.Fragment>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 22,
                                            }}
                                        >
                                            Add Organization
              </Text>
                                        <View style={styles.main}>
                                            <TextInput underlineColorAndroid='transparent' name="organizationName" value={formikProps.values.organizationName} onChangeText={formikProps.handleChange('organizationName')}
                                                onBlur={formikProps.handleBlur('organizationName')} style={styles.input} placeholder="Organization Name" />

                                            {formikProps.touched.organizationName && formikProps.errors.organizationName && <Text style={{ color: 'red' }}>{formikProps.errors.organizationName}</Text>}

                                            <TouchableOpacity style={styles.buttonContainer} onPress={formikProps.handleSubmit} >
                                                <Text style={styles.buttonText}> Submit </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.setState({ modalVisible: false })} >
                                                <Text style={styles.buttonText}> Cancel </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </React.Fragment>
                                )}
                            </Formik>
                        </Modal>
                        <ConfirmDialog
                            title="Delete"
                            message="Are you sure about that?"
                            visible={this.state.deleteVisible}
                            onTouchOutside={() => this.setState({ deleteVisible: false })}
                            positiveButton={{
                                title: "YES",
                                onPress: () => this.deleteData()
                            }}
                            negativeButton={{
                                title: "NO",
                                onPress: () => this.setState({ deleteVisible: false, selDelete: null })
                            }}
                        />
                    </View>
                
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
