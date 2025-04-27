import { color, typo } from '@/ui/constants/theme';
import { RecentSearchItems } from '@/ui/organism/recentSearchItems';
import { spacing } from '@/ui/constants/size';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, type TextStyle } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  // TODO: sort recent searches by date in descending order #7
  // https://github.com/kmjnnhyk/kurly/issues/7
  const [recentSearches, setRecentSearches] = React.useState(['Swift']);

  const handleRemoveItem = (index: number) => {
    // TODO: enable deleting individual or all recent searches #8
    // https://github.com/kmjnnhyk/kurly/issues/8
    const newSearches = [...recentSearches];
    newSearches.splice(index, 1);
    setRecentSearches(newSearches);
  };

  const handleClearAll = () => {
    setRecentSearches([]);
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
      <RecentSearchItems
        recentSearches={recentSearches}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        onSearchPress={handleSearchPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
});
