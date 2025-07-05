// src/components/ThemeToggle.jsx
export default function ThemeToggle() {
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle('dark');
    };
  
    return (
      <button onClick={toggleDarkMode} className="text-sm px-4 py-2 border rounded">
        Toggle Theme
      </button>
    );
  }