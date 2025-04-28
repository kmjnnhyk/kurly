import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export interface RecentSearchQuery {
  query: string;
  date: Date;
}

interface QueryStore {
  queries: RecentSearchQuery[];
  queriesMap: Map<string, Date>;
  loading: boolean;

  initializeStore: () => Promise<void>;
  getSearchQueries: (limit?: number) => RecentSearchQuery[];
  storeSearchQuery: (query: string) => Promise<void>;
  removeSearchQuery: (query: string) => Promise<void>;
  clearSearchQueries: () => Promise<void>;

  _loadQueriesMap: () => Promise<Map<string, Date>>;
  _saveQueriesMap: (map: Map<string, Date>) => Promise<void>;
  _updateQueriesFromMap: (map: Map<string, Date>) => void;
}

export const useSearchQueryStore = create<QueryStore>((set, get) => ({
  queries: [],
  queriesMap: new Map<string, Date>(),
  loading: false,

  _loadQueriesMap: async () => {
    const jsonValue = await AsyncStorage.getItem('searchQueries');

    if (!jsonValue) return new Map<string, Date>();

    return new Map(
      JSON.parse(jsonValue).map(([key, dateStr]: [string, string]) => [
        key,
        new Date(dateStr),
      ]),
    );
  },

  _saveQueriesMap: async (map: Map<string, Date>) => {
    const jsonValue = JSON.stringify(Array.from(map.entries()));
    await AsyncStorage.setItem('searchQueries', jsonValue);
  },

  _updateQueriesFromMap: (map: Map<string, Date>) => {
    const queries = Array.from(map.entries()).map(([query, date]) => ({
      query,
      date,
    }));
    set({ queriesMap: map, queries });
  },

  getSearchQueries: (limit?: number) => {
    return [...get().queries]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit || 10);
  },

  initializeStore: async () => {
    set({ loading: true });
    try {
      const map = await get()._loadQueriesMap();
      get()._updateQueriesFromMap(map);
      set({ loading: false });
    } catch (error) {
      console.error('초기화 실패:', error);
      set({ loading: false });
    }
  },

  storeSearchQuery: async (query: string) => {
    try {
      const map = await get()._loadQueriesMap();
      map.set(query.toLowerCase(), new Date());
      await get()._saveQueriesMap(map);
      get()._updateQueriesFromMap(map);
    } catch (error) {
      console.error('검색어 저장 실패:', error);
    }
  },

  removeSearchQuery: async (query: string) => {
    try {
      const map = await get()._loadQueriesMap();
      map.delete(query.toLowerCase());
      await get()._saveQueriesMap(map);
      get()._updateQueriesFromMap(map);
    } catch (error) {
      console.error('검색어 삭제 실패:', error);
    }
  },

  clearSearchQueries: async () => {
    try {
      await AsyncStorage.removeItem('searchQueries');
      set({ queries: [], queriesMap: new Map<string, Date>() });
    } catch (error) {
      console.error('검색어 전체 삭제 실패:', error);
    }
  },
}));
