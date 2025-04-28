import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
  type TextStyle,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { color, typo } from '@/ui/constants/theme';
import { spacing } from '@/ui/constants/size';

export default function WebViewModalScreen() {
  const { url, title } = useLocalSearchParams<{
    url?: string;
    title?: string;
  }>();
  const router = useRouter();

  if (!url) {
    return <View style={styles.container} />;
  }

  return (
    // SafeAreaView 사용하여 노치 등 영역 피하기
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {decodeURIComponent(title)}
          </Text>
        )}
        <View style={{ width: spacing.xxl }} />
      </View>
      <WebView
        source={{ uri: decodeURIComponent(url) }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color={color.iconGray}
            size="large"
            style={styles.loadingIndicator}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.divider,
    backgroundColor: color.background,
  },
  title: {
    flex: 1,
    ...(typo.body as TextStyle),
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: spacing.s,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeButtonText: {
    ...(typo.body as TextStyle),
    color: color.iconGray,
  },
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  webview: {
    flex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.background,
  },
});
