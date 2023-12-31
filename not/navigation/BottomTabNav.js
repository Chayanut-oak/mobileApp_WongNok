import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../src/screen/Home';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../src/components/CustomHeaderButton';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from "firebase/auth";
import { FIREBASE_AUTH } from '../Firebaseconfig';
import HomeNav from './HomeNav';
import Profile from '../src/screen/Profile'
import CreateMeal from '../src/screen/CreateMeal';
import Notification from '../src/screen/Notification'
import CookingNav from './CookingNav';
import ProfileNav from './ProfileNav';
import SearchBarTabNav from './SearchBarTabNav'
import { resetData } from '../redux/cookingMethodSlice';
import { useDispatch } from 'react-redux';
const MenuTab = createBottomTabNavigator();
const BottomTabNav = ({ route, navigation }) => {
  const auth = getAuth();
  const dispatch = useDispatch()

  return (
    <MenuTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'white', // Change the color for active tab
        tabBarInactiveTintColor: 'black', // Change the color for inactive tabs
        tabBarStyle: { height: 88 },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#F02E5D','#DD2572']} // สีที่คุณต้องการใช้ใน gradient
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          /> ),// Change the background color of the tab bar
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MainHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'New') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'SearchScreen') {
            iconName = focused ? 'search-outline' : 'search-outline';
          } else if (route.name === "Profile") {
            iconName = focused ? 'person-sharp' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MenuTab.Screen name="MainHome" component={HomeNav} options={{ headerShown: false, title: "หน้าหลัก" }} 
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          navigation.navigate('MainHome', { screen: 'Home' });
        },
      })}
      />


      <MenuTab.Screen name="SearchScreen" component={SearchBarTabNav}
        options={{
          title: "ค้นหา",
          tabBarLabel:'สรุปที่ชื่นชอบ',
          headerTitleAlign: 'left',
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle:{fontWeight:"bold"},
          tabBarIcon: ({ color, size, focused }) => <Ionicons name='search-outline' size={size} color={color} />
        }}
        listeners={( ) => ({
          tabPress: (e) => {dispatch(resetData({
            createdBy: '',
            like: 0,
            mealId:'',
            mealImage: {},
            mealName: '',
            mealYoutube: '',
            reviews: [],
            steps: [],
            tags: [],
          }))
     
          },
        })} 
      />
   <MenuTab.Screen name="New" component={CookingNav} initialParams={{ customProp: 'Another custom prop' }} options={{
        headerStyle: { backgroundColor: "white" }, headerShown: false,
        title: "เพิ่มเมนู"
      }} />
      <MenuTab.Screen name={"Profile"} component={ProfileNav} options={{
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle:{fontWeight:"bold"},
        title: "โปรไฟล์"
      }} 
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          navigation.navigate('Profile', { screen: 'UserProfile' });
        },
      })} />


    </MenuTab.Navigator>


  )
}

export default BottomTabNav

const styles = StyleSheet.create({})