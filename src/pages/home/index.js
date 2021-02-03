import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './styles';
import Booking from '../../components/Booking';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';




export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [bookings, setBookings] = useState([]);

    const page = useRef(1);

    const navigation = useNavigation();
    
    const onRefresh = () => {
        getBookings();
    };

    async function getBookings() {
        setRefreshing(true);
        const res = await api.get('/bookings', { params: { page: page.current } });
        page.current += 1;
        setBookings([...bookings, ...res.data]);
        setRefreshing(false);
    }


    useEffect(() => {
        if (bookings.length === 0) {
            getBookings()
        }
    }, []);
    
    const renderItem = ({ item }) => <Booking booking={item} />

    return (
        <View style={{ flex: 1, backgroundColor: '#57606f' }}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    Agendamentos
                </Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                        
                    }
                    onEndReached={getBookings}
                    onEndReachedThreshold={0.5}
                    data={bookings}
                    renderItem={renderItem}
                    keyExtractor={(booking) => booking.id}
                />
            </View>
        </View>

    );
};