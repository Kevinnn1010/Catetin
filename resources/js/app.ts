import '../css/app.css';
import ApexCharts from 'apexcharts';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h, onMounted } from 'vue';
import { initializeTheme } from './composables/useAppearance';

// Nama aplikasi dari env, fallback 'Laravel'
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue')
        ),
    setup({ el, App, props, plugin }) {
        // Buat instance Vue
        const vueApp = createApp({ render: () => h(App, props) });

        // Bisa pakai plugin Vue lainnya
        vueApp.use(plugin);

        // Mount Inertia app
        vueApp.mount(el);

        // Optional: contoh logika chart global
        // Jalankan setelah DOM tersedia
        onMounted(() => {
            const chartEl = document.getElementById("main-chart");
            if (chartEl && typeof ApexCharts !== "undefined") {
                const computedStyle = getComputedStyle(document.documentElement);
                const brandColor = computedStyle.getPropertyValue('--color-fg-brand').trim() || "#1447E6";
                const brandSecondaryColor = computedStyle.getPropertyValue('--color-fg-brand-subtle').trim() || "#1447E6";

                const options: ApexCharts.ApexOptions = {
                    chart: { type: "area", height: "100%", toolbar: { show: false } },
                    series: [
                        { name: "Developer Edition", data: [1500, 1418, 1456, 1526, 1356, 1256], color: brandColor },
                        { name: "Designer Edition", data: [643, 413, 765, 412, 1423, 1731], color: brandSecondaryColor }
                    ],
                    xaxis: { 
                        categories: ['01 Feb','02 Feb','03 Feb','04 Feb','05 Feb','06 Feb','07 Feb'], 
                        labels: { show: false } 
                    },
                    yaxis: { show: false },
                    stroke: { width: 6 },
                    fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0, gradientToColors: [brandColor] } },
                    dataLabels: { enabled: false },
                    grid: { show: false },
                    tooltip: { enabled: true, x: { show: false } }
                };

                const chart = new ApexCharts(chartEl, options);
                chart.render();
            }
        });
    },
    progress: {
        color: '#4B5563',
    },
});

// Set light / dark mode saat page load
initializeTheme();