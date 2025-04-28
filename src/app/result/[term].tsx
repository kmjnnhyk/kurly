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
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  type InfiniteData,
  type QueryFunctionContext,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { spacing } from '@/ui/constants/size';

const GITHUB_REQUEST_LIMIT = 1000;

interface GitHubRepoOwner {
  login: string;
  avatar_url: string;
}

interface GitHubRepoItem {
  id: number;
  name: string;
  owner: GitHubRepoOwner;
  html_url: string;
}

interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoItem[];
}

interface RepositoryWithUrl extends Repository {
  url: string;
}

const fetchRepositories = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: readonly [string, string];
  pageParam?: number;
}): Promise<GitHubSearchResponse> => {
  const [, term] = queryKey;

  if (!term) {
    throw new Error('Search term is required.');
  }

  const baseUrl = process.env.EXPO_PUBLIC_GITHUB_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('API base URL is not configured.');
  }

  const url = `${baseUrl}/search/repositories?q=${encodeURIComponent(term)}&page=${pageParam}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function ResultsScreenContent() {
  const { term } = useLocalSearchParams<{ term: string }>();
  const router = useRouter();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<
    GitHubSearchResponse,
    Error,
    InfiniteData<GitHubSearchResponse>,
    readonly [string, string],
    number
  >({
    queryKey: ['repositories', term || ''],
    queryFn: (
      context: QueryFunctionContext<readonly [string, string], number>,
    ) =>
      fetchRepositories({
        queryKey: context.queryKey,
        pageParam: context.pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.items.length,
        0,
      );
      const totalCount = lastPage.total_count;
      const nextPage = lastPageParam + 1;

      if (totalFetched < totalCount && totalFetched < GITHUB_REQUEST_LIMIT) {
        return nextPage;
      }
      return undefined;
    },
    enabled: !!term,
  });

  const handlePressItem = (repository: RepositoryWithUrl) => {
    const encodedUrl = encodeURIComponent(repository.url);
    const encodedTitle = encodeURIComponent(repository.name);
    router.push({
      pathname: '/result/webviewModal',
      params: { url: encodedUrl, title: encodedTitle },
    });
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

  const repositories: RepositoryWithUrl[] =
    data?.pages.flatMap((page) =>
      page.items.map((item) => ({
        id: String(item.id),
        name: item.name,
        owner: item.owner.login,
        avatarUrl: item.owner.avatar_url,
        url: item.html_url,
      })),
    ) ?? [];

  const totalCount = data?.pages[0]?.total_count ?? 0;

  return (
    <View style={styles.container}>
      <RepositoryItems
        repositories={repositories}
        totalCount={totalCount}
        onItemPress={handlePressItem}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
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
    color: color.textTertiary,
  },
});
