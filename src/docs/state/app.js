const initialState = {
  isDarkMode: false,
  lastPageTitle: 'Home',
  lastPageUrl: '/',
  searchQuery: '',
};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';
const PUSH_NEW_PAGE = 'PUSH_NEW_PAGE';

export const toggleDarkMode = isDarkMode => ({
  type: TOGGLE_DARKMODE, isDarkMode
});

export const pushNewPage = (pageTitle, pageUrl) => ({
  type: PUSH_NEW_PAGE, pageTitle, pageUrl
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return {
        ...state,
        isDarkMode: action.isDarkMode
      }
    case PUSH_NEW_PAGE:
      return {
        ...state,
        lastPageTitle: action.pageTitle,
        lastPageUrl: action.pageUrl
      }
    default:
      return state;
  }
};