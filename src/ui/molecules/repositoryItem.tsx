/**
 * 저장소 항목 컴포넌트 모듈
 *
 * GitHub 저장소 정보를 표시하는 컴포넌트를 제공합니다.
 * @module RepositoryItem
 */
import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  type TextStyle,
} from 'react-native';
import { spacing, radius } from '../constants/size';
import { color, typo } from '../constants/theme';

/**
 * 저장소 데이터 인터페이스
 * @interface Repository
 */
export interface Repository {
  /** 저장소 고유 식별자 */
  id: string;
  /** 저장소 이름 */
  name: string;
  /** 저장소 소유자(작성자) */
  owner: string;
  /** 저장소 아바타 이미지 URL */
  avatarUrl: string;
}

/**
 * RepositoryItem 컴포넌트의 속성 인터페이스
 * Repository에서 'id'를 제외한 속성을 상속받습니다.
 * @interface
 */
interface RepositoryItemProps extends Omit<Repository, 'id'> {
  /**
   * 항목 클릭 핸들러 함수
   * 제공되지 않으면 항목은 클릭할 수 없습니다.
   */
  onPress?: () => void;
}

/**
 * 저장소 항목 컴포넌트
 *
 * 저장소의 아바타 이미지, 이름, 소유자 정보를 표시합니다.
 * onPress 속성이 제공되면 터치 가능한 항목으로 렌더링됩니다.
 *
 * @param {object} props - 컴포넌트 속성
 * @param {string} props.name - 저장소 이름
 * @param {string} props.owner - 저장소 소유자
 * @param {string} props.avatarUrl - 저장소 아바타 URL
 * @param {Function} [props.onPress] - 항목 클릭 핸들러 (선택 사항)
 * @returns {React.ReactElement} 저장소 항목 컴포넌트
 *
 * @example
 * <RepositoryItem
 *   name="react-native"
 *   owner="facebook"
 *   avatarUrl="https://github.com/facebook.png"
 *   onPress={() => navigateToRepository("react-native")}
 * />
 */
export const RepositoryItem: React.FC<RepositoryItemProps> = ({
  name,
  owner,
  avatarUrl,
  onPress,
}) => {
  /**
   * 공통 콘텐츠 요소
   * 터치 가능 여부에 관계없이 동일한 내용을 표시
   */
  const content = (
    <>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
        defaultSource={require('../../../assets/images/icon.png')}
        accessibilityLabel={`${owner}의 저장소 아이콘`}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.owner}>{owner}</Text>
      </View>
    </>
  );

  // onPress가 제공되면 TouchableOpacity, 아니면 View로 렌더링
  return onPress ? (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessibilityLabel={`${name} 저장소, 소유자: ${owner}`}
      accessibilityRole="button"
    >
      {content}
    </TouchableOpacity>
  ) : (
    <View
      style={styles.container}
      accessibilityLabel={`${name} 저장소, 소유자: ${owner}`}
    >
      {content}
    </View>
  );
};

/**
 * RepositoryItem 컴포넌트의 스타일
 */
const styles = StyleSheet.create({
  /**
   * 컨테이너 스타일: 가로 방향 배치와 패딩 설정
   */
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
  },
  /**
   * 아바타 이미지 스타일: 크기와 모서리 반경 설정
   */
  avatar: {
    width: spacing.xl + spacing.xs, // 40px
    height: spacing.xl + spacing.xs, // 40px
    borderRadius: radius.m,
    backgroundColor: color.searchBarBg,
  },
  /**
   * 텍스트 컨테이너 스타일: 이름과 소유자 정보를 세로로 배치
   */
  textContainer: {
    marginLeft: spacing.m,
    flex: 1,
  },
  /**
   * 저장소 이름 텍스트 스타일
   */
  name: {
    ...(typo.body as TextStyle),
    fontWeight: '500',
  },
  /**
   * 저장소 소유자 텍스트 스타일
   */
  owner: {
    ...(typo.caption as TextStyle),
    color: color.textSecondary,
  },
});
