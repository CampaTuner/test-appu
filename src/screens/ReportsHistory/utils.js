import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const getIconByStatus = (status) => {
    switch (status) {
        case 'Pending':
            return <MaterialIcons name="hourglass-empty" size={20} color="red" style={{ marginRight: 8, }} />;
        case 'In Progress':
            return <AntDesign name="clockcircleo" size={20} color="#FFC107" style={{ marginRight: 8, }} />;
        case 'Resolved':
            return <MaterialCommunityIcons name="check-decagram" size={20} color="green" style={{ marginRight: 8, }} />;
        default:
            return <MaterialIcons name="help-outline" size={20} color="#9E9E9E" style={{ marginRight: 8, }} />;
    }
};

const getIconByType = (type) => {
    switch (type) {
        case 'Organic':
            return <MaterialIcons name="eco" size={20} color="#4CAF50" style={{ marginRight: 8 }} />

        case 'Inorganic':
            return <MaterialCommunityIcons name="recycle-variant" size={20} color="#FF5722" style={{ marginRight: 8 }} />

        case 'Mixed':
            return <MaterialCommunityIcons name="delete-variant" size={20} color="#2196F3" style={{ marginRight: 8 }} />

        default:
            return <MaterialIcons name="help-outline" size={20} color="#9E9E9E" style={{ marginRight: 8 }} />

    }
};

export {
    getIconByStatus,
    getIconByType
}




