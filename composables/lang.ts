export const useLang = () => {
  const { locale } = useI18n();
  const lang = locale.value === "en" ? 0 : 1;

  return { lang };
};
