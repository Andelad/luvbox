export const APP_CONFIG = {
  storage: {
    DEALBREAKERS_KEY: 'dealbreakers',
    USER_LINE_VALUES_KEY: 'userLineValues',
    CUBE_SNAPSHOTS_KEY: 'cubeSnapshots',
    SIDEBAR_EXPANDED_KEY: 'sidebarExpanded',
    ACTION_PANEL_EXPANDED_KEY: 'actionPanelExpanded',
  },
  
  cube: {
    DEFAULT_VALUES: [5, 5, 5, 5, 5, 5, 5],
    AXIS_LABELS: {
      xLabels: ['Pe', 'PA', 'FV', 'Va', 'G', 'Be', 'Vi'],
      yLabels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      xGroupLabels: ['Intimacy', 'Purpose'],
      showGroupLabels: false,
      yAxisTitle: 'Rating'
    }
  },
  
  urls: {
    FEEDBACK_FORM: 'https://forms.gle/yourFeedbackFormLink',
    BUY_COFFEE: 'https://www.buymeacoffee.com/yourname',
  }
};
