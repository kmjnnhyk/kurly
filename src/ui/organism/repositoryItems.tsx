/**
 * 저장소 목록 컴포넌트 모듈
 *
 * GitHub 저장소 검색 결과를 목록 형태로 표시하는 컴포넌트를 제공합니다.
 * @module RepositoryItems
 */
import { type Repository, RepositoryItem } from '@/ui/molecules/repositoryItem';
import { spacing } from '@/ui/constants/size';
import { color, typo } from '@/ui/constants/theme';
import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  type TextStyle,
  type ListRenderItemInfo,
} from 'react-native';

/**
 * RepositoryItems 컴포넌트의 속성 인터페이스
 * @interface
 */
interface RepositoryItemsProps {
  /** 표시할 저장소 데이터 배열 */
  repositories: Repository[];

  /** 전체 검색 결과 개수 */
  totalCount: number;

  /**
   * 저장소 항목 클릭 핸들러 함수
   * @param {Repository} repository - 클릭된 저장소 데이터
   */
  onItemPress?: (repository: Repository) => void;
}

/**
 * 저장소 목록을 표시하는 Organism 컴포넌트
 *
 * 저장소 검색 결과 개수와 저장소 항목 목록을 표시합니다.
 *
 * @param {object} props - 컴포넌트 속성
 * @param {Repository[]} props.repositories - 표시할 저장소 데이터 배열
 * @param {number} props.totalCount - 전체 검색 결과 개수
 * @param {Function} [props.onItemPress] - 저장소 항목 클릭 핸들러 (선택 사항)
 * @returns {React.ReactElement} 저장소 목록 컴포넌트
 *
 * @example
 * <RepositoryItems
 *   repositories={searchResults}
 *   totalCount={266714}
 *   onItemPress={(repo) => navigateToDetails(repo)}
 * />
 */
export const RepositoryItems: React.FC<RepositoryItemsProps> = ({
  repositories,
  totalCount,
  onItemPress,
}) => {
  /**
   * 개별 저장소 항목을 렌더링하는 함수
   *
   * @param {ListRenderItemInfo<Repository>} param - FlatList에서 제공하는 렌더링 정보
   * @returns {React.ReactElement} 렌더링된 저장소 항목
   */
  const renderItem = ({
    item,
  }: ListRenderItemInfo<Repository>): React.ReactElement => (
    <RepositoryItem
      name={item.name}
      owner={item.owner}
      avatarUrl={item.avatarUrl}
      onPress={onItemPress ? () => onItemPress(item) : undefined}
    />
  );

  return (
    <View style={styles.container}>
      {/* 검색 결과 개수 표시 */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {totalCount.toLocaleString()}개 저장소
        </Text>
      </View>

      {/* 저장소 목록 */}
      <FlatList
        data={repositories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        accessibilityLabel="저장소 검색 결과 목록"
      />
    </View>
  );
};

/**
 * RepositoryItems 컴포넌트의 스타일
 */
const styles = StyleSheet.create({
  /**
   * 컨테이너 스타일: 전체 화면을 차지하며 배경색 설정
   */
  container: {
    flex: 1,
    backgroundColor: color.background,
  },

  /**
   * 검색 결과 개수 표시 영역 스타일
   */
  countContainer: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
  },

  /**
   * 검색 결과 개수 텍스트 스타일
   */
  countText: {
    ...(typo.caption as TextStyle),
    color: color.textSecondary,
  },

  /**
   * FlatList의 콘텐츠 컨테이너 스타일
   */
  listContent: {
    paddingBottom: spacing.m,
  },
});
