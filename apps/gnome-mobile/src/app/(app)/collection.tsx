      import React, { useState } from "react";
      import { Text, View, FlatList, StyleSheet } from "react-native";
      import axios from "axios";
      import { Button } from "@/components/ui/button";
      
      const API_URL = "http://localhost:3000/api/rest/v1/gnomes"; // Zmiana na emulator-friendly URL
      
      const Collection = () => {
        const [krasnale, setKrasnale] = useState([]);
      
        const fetchKrasnale = async () => {
          try {
            const response = await axios.get(API_URL);
            setKrasnale(response.data);
          } catch (error) {
            console.error("Błąd pobierania danych:", error.response ? error.response.data : error.message);
          }
        };
      
        return (
          <View style={styles.container}>
            <Text style={styles.header}>Kolekcja</Text>
            <Button onPress={fetchKrasnale}>
              <Text>Pobierz Krasnale</Text>
            </Button>
            <FlatList 
              data={krasnale}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            />
          </View>
        );
      };
      
      const styles = StyleSheet.create({
        container: { padding: 20 },
        header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
        item: { fontSize: 18, paddingVertical: 5 },
      });
      
      export default Collection;
      