const AppConfig = {
    appName: 'ReelinQ',
    version: '1.0.0',
    apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    theme: {
        default: 'light',
        supported: ['light', 'dark']
    },
    branding: {
        logoAlt: 'ReelinQ Logo',
        primaryColor: '#1B3B6F',
        secondaryColor: '#3EC1D3'
    },
    features: {
        enableGoogleAuth: true,
        enableDarkModeToggle: true
    }
};

export default AppConfig;