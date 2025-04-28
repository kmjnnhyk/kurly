import { color } from '@/ui/constants/theme';
import { RecentSearchItems } from '@/ui/organism/recentSearchItems';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSearchQueryStore } from '@/hooks/useSearchQueryStore';

export default function HomeScreen() {
  const router = useRouter();
  const {
    loading,
    getSearchQueries,
    initializeStore,
    removeSearchQuery,
    clearSearchQueries,
  } = useSearchQueryStore();

  React.useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  const queries = getSearchQueries();

  const handleRemoveItem = (query: string) => {
    removeSearchQuery(query);
  };

  const handleClearAll = () => {
    clearSearchQueries();
  };

  const handleSearchPress = (searchTerm: string) => {
    // TODO: show search results when selecting a recent search #10
    // https://github.com/kmjnnhyk/kurly/issues/10
    router.push({
      pathname: '/result/[term]',
      params: { term: searchTerm },
    });
  };

  // TODO: show autocomplete suggestions when entering a query #11
  // https://github.com/kmjnnhyk/kurly/issues/11
  return (
    <View style={styles.container}>
      {/* TODO: show up to 10 recent searches when query is empty #6
      {/* https://github.com/kmjnnhyk/kurly/issues/6 */}
      {!loading && (
        <RecentSearchItems
          recentSearches={queries}
          onRemoveItem={handleRemoveItem}
          onClearAll={handleClearAll}
          onSearchPress={handleSearchPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
});
