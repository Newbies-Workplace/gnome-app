import { GnomesService } from "@/lib/api/Gnomes.service";
import { useAuthStore } from "@/store/useAuthStore";
import { create } from "zustand";

export interface Gnome {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  creationDate: Date;
  description: string;
  exists: boolean;
}

interface GnomeState {
  gnomes: Gnome[];
  loading: boolean;
  error: string | null;

  fetchGnomes: () => Promise<void>;
  addGnome: (gnome: Gnome) => void;
  removeGnome: (id: string) => void;
}

export const useGnomeStore = create<GnomeState>((set) => ({
  gnomes: [],
  loading: false,
  error: null,

  fetchGnomes: async () => {
    set({ loading: true });
    try {
      const data = await GnomesService.getGnomes();
      console.log(data);
      set({ gnomes: data, loading: false });
    } catch (error) {
      set({ error: "Failed to load gnomes", loading: false });
    }
  },

  addGnome: (gnome) => set((state) => ({ gnomes: [...state.gnomes, gnome] })),

  removeGnome: (id) =>
    set((state) => ({
      gnomes: state.gnomes.filter((gnome) => gnome.id !== id),
    })),
}));

// // import React, { useEffect } from 'react';
// // import { View, Text, Button } from 'react-native';
// // import { useGnomeStore } from './useGnomeStore';

// // const GnomeList = () => {
// //     const { gnomes, fetchGnomes, loading, error } = useGnomeStore();

// //     useEffect(() => {
// //         fetchGnomes();
// //     }, []);

// //     if (loading) return <Text>Ładowanie...</Text>;
// //     if (error) return <Text>Błąd: {error}</Text>;

// //     return (
// //         <View>
// //             <Button title="Odśwież gnomy" onPress={fetchGnomes} />
// //             {gnomes.map((gnome) => (
// //                 <Text key={gnome.id}>{gnome.nazwa}</Text>
// //             ))}
// //         </View>
// //     );
// // };

// // export default GnomeList;
