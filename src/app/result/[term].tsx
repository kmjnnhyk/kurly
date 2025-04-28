import type { Repository } from '@/ui/molecules/repositoryItem';
import { color, typo } from '@/ui/constants/theme';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  type TextStyle,
} from 'react-native';
import { RepositoryItems } from '@/ui/organism/repositoryItems';
import { useLocalSearchParams } from 'expo-router';
import { useQuery, QueryClientProvider } from '@tanstack/react-query';
import { spacing } from '@/ui/constants/size';

interface GitHubRepoOwner {
  login: string;
  avatar_url: string;
}

interface GitHubRepoItem {
  id: number;
  name: string;
  owner: GitHubRepoOwner;
  // 필요한 다른 필드 추가 가능
}

interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoItem[];
}

export default function ResultsScreenContent() {
  const { term } = useLocalSearchParams<{ term: string }>();

  // API 호출 함수 (첫 페이지만 가져옴)
  const fetchRepositories = async (
    term: string,
  ): Promise<GitHubSearchResponse> => {
    if (!term) {
      throw new Error('Search term is required.');
    }

    const baseUrl = process.env.EXPO_PUBLIC_GITHUB_API_BASE_URL;
    if (!baseUrl) {
      throw new Error('API base URL is not configured.');
    }

    // TODO: prefetch next page during scrolling #18
    // https://github.com/kmjnnhyk/kurly/issues/18
    const url = `${baseUrl}/search/repositories?q=${encodeURIComponent(term)}&page=1`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery<GitHubSearchResponse, Error>({
    queryKey: ['repositories', term || ''],
    queryFn: () => fetchRepositories(term || ''),
    enabled: !!term,
  });

  const handlePressItem = (repository: Repository) => {
    // TODO: open selected repository in webview #17
    console.log(`${repository.name} pressed:`);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={color.iconGray} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>데이터를 불러오는데 실패했습니다.</Text>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  const repositories =
    data?.items.map((item) => ({
      id: String(item.id),
      name: item.name,
      owner: item.owner.login,
      avatarUrl: item.owner.avatar_url,
    })) ?? [];

  const totalCount = data?.total_count ?? 0;

  return (
    <View style={styles.container}>
      <RepositoryItems
        repositories={repositories}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: (typo.body as TextStyle).fontSize,
    textAlign: 'center',
    marginBottom: spacing.s,
  },
});
