import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DropdownItem from './DropdownItem';

const dropdownConfig = [
    {
        key: 'type',
        placeholder: 'Type',
        data: [
            { label: 'All', value: 'All' },
            { label: 'Organic', value: 'Organic' },
            { label: 'Inorganic', value: 'Inorganic' },
            { label: 'Mixed', value: 'Mixed' },
        ],
    },
    {
        key: 'status',
        placeholder: 'Status',
        data: [
            { label: 'All', value: 'All' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Progress', value: 'Progress' },
            { label: 'Resolved', value: 'Resolved' },
        ],
    },
    {
        key: 'sort',
        placeholder: 'Sort',
        data: [
            { label: 'Newest', value: '-1' },
            { label: 'Oldest', value: '1' },
        ],
    },
];

const Header = ({ query, setQuery }) => {
    const [focus, setFocus] = useState('');

    return (
        <View style={styles.container}>
            {dropdownConfig.map(({ key, placeholder, data }) => (
                <Dropdown
                    key={key}
                    style={[styles.dropdown, focus === key && styles.focusedDropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    containerStyle={styles.containerStyle}
                    data={data}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={placeholder}
                    value={query[key]}
                    onFocus={() => setFocus(key)}
                    onBlur={() => setFocus('')}
                    onChange={item => {
                        setQuery({ ...query, [key]: item.value });
                        setFocus('');
                    }}
                    renderItem={DropdownItem}
                />
            ))}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    dropdown: {
        flex: 1,
        height: 40,
        backgroundColor: '#2b2b30',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    focusedDropdown: {
        borderColor: '#5cb85c',
        borderWidth: 1.5,
    },
    placeholderStyle: {
        color: '#999',
        fontSize: 14,
    },
    selectedTextStyle: {
        color: '#fff',
        fontSize: 14,
    },
    containerStyle: {
        backgroundColor: '#111',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#333',
        paddingVertical: 4,
    }
});
