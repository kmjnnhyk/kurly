/**
 * 검색 헤더 컴포넌트 모듈
 *
 * 앱 상단에 위치하며 저장소 검색 기능을 제공하는 헤더 컴포넌트입니다.
 * @module SearchHeader
 */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  type TextStyle,
  Keyboard,
} from 'react-native';
import { color, typo } from '../ui/constants/theme';
import { spacing, radius } from '../ui/constants/size';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSearchQueryStore } from '@/hooks/useSearchQueryStore';

/**
 * 검색 헤더 컴포넌트
 *
 * 앱 상단에 위치하며 검색 입력창과 제목을 표시합니다.
 * 입력창 포커스 시 제목이 사라지고, 입력 값이 있을 경우 지우기 버튼이 표시됩니다.
 *
 * @returns {React.ReactElement} 검색 헤더 컴포넌트
 *
 * @example
 * <SearchHeader />
 */
export const SearchHeader: React.FC = () => {
  const router = useRouter();
  const { storeSearchQuery } = useSearchQueryStore();

  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      storeSearchQuery(value);
      router.push({
        pathname: '/result/[term]',
        params: { term: value },
      });
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setValue('');
  };

  const handleCancel = () => {
    setValue('');
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={[styles.container]}>
        {/* 헤더 타이틀 - 포커스 상태가 아닐 때만 표시 */}
        {!isFocused && <Text style={styles.title}>Search</Text>}

        {/* 검색 영역 (검색창 + 취소 버튼) */}
        <View style={styles.searchArea}>
          {/* 검색바 컨테이너 */}
          <View style={styles.searchBarContainer}>
            {/* 검색 아이콘 */}
            <View style={styles.searchIconContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
            </View>

            {/* 검색 입력창 */}
            <TextInput
              style={styles.input}
              value={value}
              placeholder="저장소 검색"
              onChangeText={handleChangeText}
              returnKeyType="search"
              onSubmitEditing={handleSubmit}
              autoFocus={false}
              clearButtonMode="never"
              onFocus={handleFocus}
              onBlur={handleBlur}
              accessibilityLabel="GitHub 저장소 검색"
              accessibilityRole="search"
            />

            {/* 입력값 지우기 버튼 - 입력값이 있을 때만 표시 */}
            {value.length > 0 && (
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
                hitSlop={{
                  top: spacing.s + spacing.xs,
                  bottom: spacing.s + spacing.xs,
                  left: spacing.s + spacing.xs,
                  right: spacing.s + spacing.xs,
                }}
                accessibilityLabel="검색어 지우기"
                accessibilityRole="button"
              >
                <View style={styles.clearButtonInner}>
                  <Text style={styles.clearButtonText}>✕</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* 취소 버튼 - 입력창이 포커스될 때만 표시 */}
          {isFocused && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 포커스 시 나타나는 전체 화면 오버레이 */}
        {isFocused && value.length > 0 && (
          <View style={styles.fullScreenOverlay}>
            {/* 검색어 표시 영역 */}
            <View style={styles.searchTermContainer}>
              <Text style={styles.searchTermText}>{value}</Text>
              <Text style={styles.searchDateText}>03. 09.</Text>
            </View>

            {/* 검색 결과 컨텐츠 영역 - 필요에 따라 별도 컴포넌트로 분리 가능 */}
            <View style={styles.searchResultsContainer}>
              {/* 여기에 검색 결과 목록이 표시됩니다 */}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

/**
 * SearchHeader 컴포넌트의 스타일
 */
const styles = StyleSheet.create({
  /**
   * 헤더 컨테이너 스타일
   * 배경색과 하단 경계선 설정
   */
  container: {
    backgroundColor: color.background,
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.m,
    borderBottomWidth: 0.5,
    borderBottomColor: color.divider,
  },

  /**
   * 검색 영역 (검색창 + 취소 버튼을 가로로 배치)
   */
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /**
   * 헤더 제목 스타일
   */
  title: {
    ...(typo.title as TextStyle),
    marginBottom: spacing.m,
  },

  /**
   * 검색바 컨테이너 스타일
   * 검색 아이콘, 입력창, 지우기 버튼을 가로로 배치
   */
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.searchBarBg,
    borderRadius: radius.m,
    paddingHorizontal: spacing.s,
    height: spacing.xl + spacing.s, // 40px
    flex: 1, // 너비를 최대한 확보
  },

  /**
   * 검색 아이콘 컨테이너 스타일
   */
  searchIconContainer: {
    paddingHorizontal: spacing.xs,
  },

  /**
   * 검색 아이콘 텍스트 스타일
   */
  searchIcon: {
    fontSize: (typo.body as TextStyle).fontSize,
    color: color.textSecondary,
  },

  /**
   * 검색 입력창 스타일
   */
  input: {
    flex: 1,
    fontSize: (typo.body as TextStyle).fontSize,
    color: color.text,
    padding: spacing.s,
  },

  /**
   * 지우기 버튼 컨테이너 스타일
   */
  clearButton: {
    padding: spacing.xs,
    marginRight: spacing.xs,
  },

  /**
   * 지우기 버튼 내부 원형 스타일
   */
  clearButtonInner: {
    width: spacing.s + spacing.xs + spacing.xs,
    height: spacing.s + spacing.xs + spacing.xs,
    borderRadius: (spacing.s + spacing.xs + spacing.xs) / 2,
    backgroundColor: color.iconGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /**
   * 지우기 버튼 텍스트('✕') 스타일
   */
  clearButtonText: {
    color: color.background,
    fontSize: (typo.small as TextStyle).fontSize,
    fontWeight: 'bold',
  },

  /**
   * 취소 버튼 스타일
   */
  cancelButton: {
    paddingLeft: spacing.m,
    paddingVertical: spacing.xs,
  },

  /**
   * 취소 버튼 텍스트 스타일
   */
  cancelButtonText: {
    fontSize: (typo.body as TextStyle).fontSize,
    color: color.accent,
    fontWeight: '500',
  },

  /**
   * 포커스 시 나타나는 전체 화면 오버레이
   */
  fullScreenOverlay: {
    position: 'absolute',
    padding: spacing.s,
    top: '100%',
    left: 0,
    right: 0,
    bottom: -999,
    backgroundColor: color.background,
    zIndex: 999,
  },

  /**
   * 검색어 표시 컨테이너
   */
  searchTermContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: color.divider,
  },

  /**
   * 검색어 텍스트 스타일
   */
  searchTermText: {
    fontSize: (typo.body as TextStyle).fontSize,
    fontWeight: '400',
    color: color.text,
  },

  /**
   * 검색 날짜 텍스트 스타일
   */
  searchDateText: {
    fontSize: (typo.caption as TextStyle).fontSize,
    color: color.textSecondary,
  },

  /**
   * 검색 결과 컨테이너
   */
  searchResultsContainer: {
    flex: 1, // 남은 공간을 모두 차지
  },
});
