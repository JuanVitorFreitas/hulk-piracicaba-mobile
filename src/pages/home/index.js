import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './styles';
import Booking from '../../components/Booking';
import api, { Credentials, refreshCredentials } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import orderBy from "lodash.orderby";


// const AuthContext = createContext({});


export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [bookings, setBookings] = useState([]);
    const route = useRoute();
    const { accessToken } = route.params;

    const page = useRef(1);
    const totalCount = useRef(-1);

    const handleRefresh = () => {
        getBookings(true);
    };


    async function getBookings(isRefresh) {
        if (isRefresh) {
            setRefreshing(true);
            page.current = 1;
        } else if (bookings.length >= totalCount.current && totalCount.current > -1) {
            console.log('Todos os agendamentos estao carregados');
            return;
        }
        console.log(`Carregando pagina ${page.current}`);
        const res = await api.get('/bookings', {
            params: { page: page.current }, headers: {
                authorization: `Bearer ${accessToken}`
            }
        });


        totalCount.current = res.headers['x-total-count'];

        page.current += 1;
        if (isRefresh) {
            setBookings(orderBy(res.data.filter((b => new Date(b.startsAt).getTime() >= (Date.now() - (60 * 1000))), 'startsAt', "asc")));
            setRefreshing(false);
        } else {
            setBookings([...bookings, ...res.data]);
        }
    }

    useEffect(() => {
        if (bookings.length === 0) {
            getBookings(true);
        }
    }, []);
    
    const renderItem = ({ item }) => <Booking booking={item} />
  

    return (
        <View style={{ flex: 1, backgroundColor: '#57606f' }}>
            <View style={styles.header}>
                <Text style={styles.text} >
                    Agendamentos
                </Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => handleRefresh()}
                        />
                    }
                    onEndReached={() => getBookings(false)}
                    onEndReachedThreshold={1}
                    data={bookings}
                    renderItem={renderItem}
                    keyExtractor={(booking) => booking.id}
                />
            </View>
        </View>
    );
};