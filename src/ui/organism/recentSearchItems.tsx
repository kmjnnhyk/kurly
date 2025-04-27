/**
 * 최근 검색어 목록 컴포넌트 모듈
 *
 * 검색 기록을 관리하고 표시하는 컴포넌트를 제공합니다.
 * @module RecentSearchItems
 */
import { spacing } from '@/ui/constants/size';
import { color, typo } from '@/ui/constants/theme';
import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  type TextStyle,
} from 'react-native';
import { RecentSearchItem } from '../molecules/recentSearchItem';

/**
 * RecentSearchItems 컴포넌트의 속성 인터페이스
 * @interface
 */
interface RecentSearchItemsProps {
  /** 최근 검색어 배열 */
  recentSearches: string[];

  /** 개별 검색어 삭제 핸들러 함수
   * @param {number} index - 삭제할 검색어의 인덱스
   */
  onRemoveItem: (index: number) => void;

  /** 모든 검색어 삭제 핸들러 함수 */
  onClearAll: () => void;

  /** 검색어 선택 시 실행할 핸들러 함수
   * @param {string} term - 선택된 검색어
   */
  onSearchPress: (term: string) => void;
}

/**
 * 최근 검색어 목록을 표시하는 Organism 컴포넌트
 *
 * 검색어 항목과 헤더(제목 + 전체삭제 버튼)를 포함합니다.
 * 검색어가 없는 경우 아무것도 렌더링하지 않습니다.
 *
 * @param {object} props - 컴포넌트 속성
 * @param {string[]} props.recentSearches - 최근 검색어 배열
 * @param {Function} props.onRemoveItem - 개별 검색어 삭제 핸들러
 * @param {Function} props.onClearAll - 모든 검색어 삭제 핸들러
 * @param {Function} props.onSearchPress - 검색어 선택 핸들러
 * @returns {React.ReactElement | null} 최근 검색어 목록 컴포넌트 또는 null
 *
 * @example
 * <RecentSearchItems
 *   recentSearches={['React', 'TypeScript']}
 *   onRemoveItem={(index) => handleRemove(index)}
 *   onClearAll={() => handleClearAll()}
 *   onSearchPress={(term) => handleSearch(term)}
 * />
 */
export const RecentSearchItems: React.FC<RecentSearchItemsProps> = ({
  recentSearches,
  onRemoveItem,
  onClearAll,
  onSearchPress,
}) => {
  // 검색어가 없으면 렌더링하지 않음
  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 최근 검색어 헤더 영역 */}
      <View style={styles.recentHeaderContainer}>
        <Text style={styles.recentTitle}>최근 검색</Text>
        <TouchableOpacity
          onPress={onClearAll}
          accessibilityLabel="모든 검색어 삭제"
          accessibilityRole="button"
        >
          <Text style={styles.clearAllText}>전체삭제</Text>
        </TouchableOpacity>
      </View>

      {/* 검색어 목록 */}
      <FlatList
        data={recentSearches}
        renderItem={({ item, index }) => (
          <RecentSearchItem
            term={item}
            onRemove={() => onRemoveItem(index)}
            onPress={() => onSearchPress(item)}
          />
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        accessibilityLabel="최근 검색어 목록"
      />
    </View>
  );
};

/**
 * RecentSearchItems 컴포넌트의 스타일
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
   * 최근 검색어 헤더 컨테이너: 제목과 전체삭제 버튼 배치
   */
  recentHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
  },

  /**
   * 최근 검색어 제목 스타일
   */
  recentTitle: {
    ...(typo.subtitle as TextStyle),
    fontWeight: '500',
  },

  /**
   * 전체삭제 버튼 텍스트 스타일
   */
  clearAllText: {
    ...(typo.body as TextStyle),
    color: color.accent,
  },

  /**
   * 항목 구분선 스타일
   */
  separator: {
    height: 1,
    backgroundColor: color.divider,
    marginHorizontal: spacing.m,
  },
});
