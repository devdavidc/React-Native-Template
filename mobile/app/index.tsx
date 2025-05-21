import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';


interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const token = await AsyncStorage.getItem('token');
        //if (!token) {
          //console.log('No token found');
          //return;
        //}

        const response = await fetch('http://10.0.2.2:3000/api/auth/users', { // ⚠️ localhost ≠ localhost en emulador
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //Authorization: 'Bearer ' + token,
          },
        });

        if (!response.ok) {
          console.log('Fetch error', response.status);
          return;
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>WELCOME!</Text>
      {users.map((user) => (
        <Text key={user.id} style={{ fontSize: 20, marginTop: 5 }}>
          {user.username}
        </Text>
      ))}
    </View>
  );
}
