import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

// Define your custom preset (MyPreset) with lighter purple tones
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                primary: {
                    color: '#9c79d6', // Lighter Purple color for text-primary
                    hoverColor: '#8a67c3', // Slightly darker on hover
                    activeColor: '#7a55b0' // Even darker on active
                },
                secondary: {
                    color: '#e1b7f1', // Light lavender secondary color
                    hoverColor: '#d199e1' // Hover color for secondary elements
                }
            },
            dark: {
                primary: {
                    color: '#9e72f3', // Light purple for dark mode
                    hoverColor: '#8f63e1', // Hover effect for dark mode
                    activeColor: '#7a55cc' // Active effect for dark mode
                },
                secondary: {
                    color: '#d6b1ff', // Lighter lavender for dark mode
                    hoverColor: '#c18ef0' // Hover effect for secondary in dark mode
                }
            }
        },
        textColors: {
            primary: '#9c79d6' // Define text-primary color directly
        }
    }
});

export { MyPreset };
