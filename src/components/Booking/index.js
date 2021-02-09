import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { DateTime } from 'luxon';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Swipeable } from 'react-native-gesture-handler';
import api from '../../services/api';


const types = {
    'beard': 'Barba',
    'hair': 'Corte de Cabelo',
    'full': 'Corte de Cabelo e Barba'
};

const LeftAction = () => (
    <View style={ [ styles.booking, { backgroundColor: '#20bf6b' } ] }>
        <Text style={ styles.actionText }>Agendamento finalizado</Text>    
    </View>
);

const RightAction = () => (
    <View style={ [ styles.booking, { backgroundColor: '#eb3b5a' } ] }>
        <Text style={ styles.actionText }>Agendamento removido</Text>    
    </View>
);


export default function Booking({ booking }) {
    const { name, type, startsAt, phone, id } = booking;

    async function finishBooking() {
        try {
            const response = await api.patch(`/bookings/${id}`, {
                done: true,
            });
            console.log('Agendamento finalizado');
        } catch {
            alert('Falha ao finalizar agendamento.');
        }
    }

    async function deleteBooking() {
        try {
            const response = await api.delete(`/bookings/${id}`);
            console.log('Agendamento removido')
        } catch {
            alert('Falha ao cancelar agendamento.');
        }
    }

    return (
        <Swipeable
            onSwipeableLeftOpen={() => finishBooking()}
            renderLeftActions={LeftAction}
            onSwipeableRightOpen={() => deleteBooking()}
            renderRightActions={RightAction}
        >
            <View style={styles.booking}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.type}>{types[type]}</Text>
                <Text style={styles.startsAt}>{DateTime.fromISO(startsAt).toFormat('dd/MM/yyyy hh:mm')}</Text>
                <Text style={styles.phone}>{parsePhoneNumberFromString(phone).format('NATIONAL')}</Text>
            </View>
        </Swipeable>
    )
};

