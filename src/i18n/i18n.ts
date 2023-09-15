import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
}
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'All Categories': 'All Categories',
      'Sort by': 'Sort by',
      'My Purchase': 'My Purchase',
      Popular: 'Popular',
      Latest: 'Latest',
      'Sign In': 'Sign In',
      'Top Sales': 'Top Sales',
      Register: 'Register',
      Logout: 'Logout',
      Cart: 'View My Shopping Cart',
      Price: 'Price'
    }
  },
  vi: {
    translation: {
      'All Categories': 'Tất cả danh mục',
      'Sort by': 'Sắp xếp theo',
      'My Purchase': 'Đơn Mua',
      Popular: 'Phổ biến',
      Latest: 'Mới nhất',
      'Sign In': 'Đăng Nhập',
      'Top Sales': 'Bán chạy',
      Register: 'Đăng Kí',
      Logout: 'Đăng Xuất',
      Cart: 'Xem Giỏ Hàng',
      Price: 'Giá'
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
