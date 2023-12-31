import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { NavigationProp, Route } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRE_STORE } from '../../Firebaseconfig';
import { TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { saveuser } from '../../asyncStorage/asyncStorage';
import { doc, setDoc, collection } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const auth = FIREBASE_AUTH;

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    try {
      if (password == conPassword) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
          userId: res.user.uid,
          firstName: firstName,
          lastName: lastName,
          userImage: {},
          email: email,
          displayName: "",
          favoriteMeals: [],
          followed: [],
          follower: [],
        };
        await setDoc(doc(FIRE_STORE, 'users', res.user.uid), userData);
      }else{
        alert("Wrong confirm password");
      }
      
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image
    source={require('../../picture/veggie.png')} // เปลี่ยนเส้นทางไปยังรูปภาพพื้นหลังของคุณ
    style={styles.imageBackground} // สร้างรูปแบบสไตล์ของคุณหรือใช้ไปรย่อน
  ></Image>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../picture/logo.png')}
        />
      </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input2}
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input2}
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputField}
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setConPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient
          colors={['#F02E5D','#DD2572']}
          style={styles.TouchableOpacity}>
          <Text style={styles.Font}>SIGN UP</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ margin: 10, color: 'white' }}>Already have an account? Try</Text>
        <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("Login")}>
          Sign in
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center', // Center the input fields horizontally
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    width: '44.5%',
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    marginRight: 5,
    paddingLeft: 10,
    borderRadius: 50,
    alignItems: 'center',
    left: 17,
  },
  inputField: {
    flex: 1,
    color: '#3C3C43',
    borderRadius: 50,
  },
  TouchableOpacity: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 20,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: '#E57373',
    textDecorationLine: 'underline',
  },
  Font: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    width: 320,
    height: 170,
    marginBottom: 50,
    marginTop: 150,
  },
  icon: {
    padding: 5,
    marginRight: 5,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',

  },
  imageBackground: {
    width: 500, // ความกว้างเต็มหน้าจอ
    height: 250, // ความสูงเต็มหน้าจอ
    position: 'absolute', // ตั้งค่ารูปภาพให้เป็นพื้นหลัง
    zIndex: -1,  // ความสูงเต็มหน้าจอ
    bottom: 0,
  },
});

export default Register;
