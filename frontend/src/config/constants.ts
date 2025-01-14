export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const ROLES = {
  admin: "Admin",
  accountant: "Accountant",
};

export const HEADER_HEIGHT = 80;
export const FOOTER_HEIGHT = 80;
export const APPBAR_HEIGHT = 30;

export type colorsType = {
  main: string;
  secondry: string;
  bodyBG: string;
  white: string;
  black: string;
  grey: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  primary: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  greenAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  redAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  blueAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
};

export const tableArabicLocalText = {
  toolbarColumns: "أعمدة الأدوات",
  columnsPanelTextFieldLabel: "البحث عن عمود",
  columnsPanelTextFieldPlaceholder: "عنوان العمود",
  columnsPanelDragIconLabel: "إعادة ترتيب العمود",
  columnsPanelShowAllButton: "عرض الكل",
  columnsPanelHideAllButton: "إخفاء الكل",
  filterPanelAddFilter: "إضافة فلتر",
  filterPanelDeleteIconLabel: "حذف",
  filterPanelLinkOperator: "عامل الربط المنطقي",
  filterPanelOperators: "العاملين",
  filterPanelOperatorAnd: "و",
  filterPanelOperatorOr: "أو",
  filterPanelColumns: "الأعمدة",
  filterPanelInputLabel: "القيمة",
  filterPanelInputPlaceholder: "قيمة الفلتر",
  filterOperatorContains: "يحتوي على",
  filterOperatorEquals: "يساوي",
  filterOperatorStartsWith: "يبدأ بـ",
  filterOperatorEndsWith: "ينتهي بـ",
  filterOperatorIs: "هو",
  filterOperatorNot: "ليس",
  filterOperatorAfter: "بعد",
  filterOperatorOnOrAfter: "في أو بعد",
  filterOperatorBefore: "قبل",
  filterOperatorOnOrBefore: "في أو قبل",
  filterOperatorIsEmpty: "فارغ",
  filterOperatorIsNotEmpty: "غير فارغ",
  filterOperatorIsAnyOf: "أي من",
  filterValueAny: "أي",
  filterValueTrue: "صحيح",
  filterValueFalse: "خطأ",
  columnMenuLabel: "القائمة",
  columnMenuShowColumns: "عرض الأعمدة",
  columnMenuFilter: "فلتر (البحث)",
  columnMenuHideColumn: "إخفاء",
  columnMenuManageColumns: "إدارة الأعمدة",
  columnMenuUnsort: "إلغاء الترتيب",
  columnMenuSortAsc: "ترتيب تصاعدي",
  columnMenuSortDesc: "ترتيب تنازلي",
  columnHeaderFiltersTooltipActive: (count) =>
    `${count} ${count !== 1 ? "فلاتر" : "فلتر"} نشطة`,
  columnHeaderFiltersLabel: "عرض الفلاتر",
  columnHeaderSortIconLabel: "ترتيب",
  footerRowSelected: (count) =>
    `${count.toLocaleString()} ${count !== 1 ? "صفوف مختارة" : "صف مختار"}`,
  footerTotalRows: "إجمالي الصفوف:",
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} من ${totalCount.toLocaleString()}`,
  checkboxSelectionHeaderName: "تحديد خانة الاختيار",
  booleanCellTrueLabel: "نعم",
  booleanCellFalseLabel: "لا",
  actionsCellMore: "المزيد",
};
