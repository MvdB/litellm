"use client";

import React, { useEffect, useRef } from "react";
import { ConfigProvider, notification, message, theme as antdTheme, type ThemeConfig } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { setNotificationInstance } from "@/components/molecules/notifications_manager";
import { setMessageInstance } from "@/components/molecules/message_manager";
import { useAppearanceTheme } from "@/hooks/useAppearanceTheme";
import { applyAppearanceTheme, type AppearanceTheme } from "@/utils/appearanceTheme";

const HIGH_CONTRAST_TOKENS: ThemeConfig["token"] = {
  colorText: "#000000",
  colorTextSecondary: "#1f2937",
  colorTextTertiary: "#374151",
  colorBorder: "#000000",
  colorBorderSecondary: "#000000",
  colorPrimary: "#3730a3",
};

function antdThemeConfig(appearanceTheme: AppearanceTheme): ThemeConfig {
  switch (appearanceTheme) {
    case "dark":
      return { cssVar: true, algorithm: antdTheme.darkAlgorithm };
    case "high-contrast":
      return { cssVar: true, token: HIGH_CONTRAST_TOKENS };
    case "light":
      return { cssVar: true };
  }
}

export default function AntdGlobalProvider({ children }: { children: React.ReactNode }) {
  const [notificationApi, notificationContextHolder] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();
  const initialized = useRef(false);
  const [appearanceTheme] = useAppearanceTheme();

  useEffect(() => {
    applyAppearanceTheme(document.documentElement, appearanceTheme);
  }, [appearanceTheme]);

  useEffect(() => {
    if (!initialized.current) {
      setNotificationInstance(notificationApi);
      setMessageInstance(messageApi);
      initialized.current = true;
    }
  }, [notificationApi, messageApi]);

  return (
    <StyleProvider layer>
      <ConfigProvider theme={antdThemeConfig(appearanceTheme)}>
        {notificationContextHolder}
        {messageContextHolder}
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
