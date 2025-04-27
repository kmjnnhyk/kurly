import type { Repository } from '@/ui/molecules/repositoryItem';
import { spacing } from '@/ui/constants/size';
import { color, typo } from '@/ui/constants/theme';
import { View, StyleSheet, StatusBar, type TextStyle } from 'react-native';
import { RepositoryItems } from '@/ui/organism/repositoryItems';

// TODO: display search results as a list #14
// https://github.com/kmjnnhyk/kurly/issues/14
const FAKE_RESULTS: Repository[] = [
  {
    id: '1',
    name: 'swift',
    owner: 'apple',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '2',
    name: 'swift',
    owner: 'openstack',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '3',
    name: 'swift',
    owner: 'tensorflow',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '4',
    name: 'SwiftyJSON',
    owner: 'SwiftyJSON',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '5',
    name: 'SwiftGuide',
    owner: 'ipader',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '6',
    name: 'SwifterSwift',
    owner: 'SwifterSwift',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '7',
    name: 'SwiftLint',
    owner: 'realm',
    avatarUrl: 'https://via.placeholder.com/40',
  },
  {
    id: '8',
    name: 'Swift',
    owner: 'iOS-Swift-Developers',
    avatarUrl: 'https://via.placeholder.com/40',
  },
];

export default function ResultsScreen() {
  // TODO: show total number of search results #15
  // https://github.com/kmjnnhyk/kurly/issues/15
  const totalCount = 266714;

  const handlePressItem = (repository: Repository) => {
    // TODO: open selected repository in webview #17
    // https://github.com/kmjnnhyk/kurly/issues/17
    console.log(`${repository.name} pressed:`);
  };

  // TODO: show loading state when loading next page #19
  // https://github.com/kmjnnhyk/kurly/issues/19
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* TODO: prefetch next page during scrolling #18 */}
      {/* https://github.com/kmjnnhyk/kurly/issues/18 */}
      <RepositoryItems
        repositories={FAKE_RESULTS}
        totalCount={totalCount}
        onItemPress={handlePressItem}
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
