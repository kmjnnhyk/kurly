/**
 * 최근 검색어 항목을 표시하는 컴포넌트
 * 검색어와 삭제 버튼이 포함되어 있습니다.
 */
import type React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  type TextStyle,
} from 'react-native';
import { spacing } from '../constants/size';
import { color, typo } from '../constants/theme';

/**
 * RecentSearchItem 컴포넌트의 속성 인터페이스
 * @interface
 */
interface RecentSearchItemProps {
  /** 검색어 텍스트 */
  term: string;
  /** 검색어 항목 삭제 핸들러 */
  onRemove: () => void;
  /** 검색어 항목 클릭 핸들러 */
  onPress: () => void;
}

/**
 * 검색어 항목 컴포넌트
 *
 * 최근 검색어와 삭제 버튼을 표시하며, 항목 클릭 시 해당 검색어로 검색을 수행합니다.
 *
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.term - 검색어 텍스트
 * @param {Function} props.onRemove - 검색어 항목 삭제 핸들러
 * @param {Function} props.onPress - 검색어 항목 클릭 핸들러
 * @returns {React.ReactElement} 검색어 항목 컴포넌트
 *
 * @example
 * <RecentSearchItem
 *   term="React Native"
 *   onRemove={() => removeRecentSearchItem(index)}
 *   onPress={() => performSearch("React Native")}
 * />
 */
export const RecentSearchItem: React.FC<RecentSearchItemProps> = ({
  term,
  onRemove,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.term}>{term}</Text>
      <TouchableOpacity
        onPress={onRemove}
        style={styles.removeButton}
        accessibilityLabel={`${term} 검색어 삭제`}
        accessibilityRole="button"
      >
        <Text style={styles.removeText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

/**
 * RecentSearchItem 컴포넌트의 스타일
 */
const styles = StyleSheet.create({
  /**
   * 컨테이너 스타일: 가로 방향으로 정렬된 배치
   */
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    gap: spacing.s,
  },
  /**
   * 검색어 텍스트 스타일
   */
  term: {
    ...(typo.body as TextStyle),
  },
  /**
   * 삭제 버튼 스타일: 원형 버튼
   */
  removeButton: {
    width: spacing.l,
    height: spacing.l,
    borderRadius: spacing.m + spacing.xs,
    backgroundColor: color.searchBarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /**
   * 삭제 버튼 내 텍스트('×') 스타일
   */
  removeText: {
    ...(typo.body as TextStyle),
    fontSize: (typo.body as TextStyle).fontSize,
    color: color.textSecondary,
  },
});
