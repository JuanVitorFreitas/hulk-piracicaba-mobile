import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { DateTime } from 'luxon';


const types = {
    'beard': 'Barba',
    'hair': 'Corte de Cabelo',
    'full': 'Corte de Cabelo e Barba'
};


export default function Booking({ booking }) {
    const { name, type, startsAt } = booking;
    return( 
        <View style={styles.booking}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.type}>{types[type]}</Text>
            <Text style={styles.startsAt}>{DateTime.fromISO(startsAt).toFormat('dd/MM/yyyy hh:mm')}</Text>
        </View>
    )
};

