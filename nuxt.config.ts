// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Quran Majeed - Read, Listen, and Explore the Quran",
            meta: [
                {
                    name: 'description',
                    content: 'Al-Quran Online is a free website that allows you to read, listen to, and explore the Quran. Discover its teachings, learn the Arabic language, and deepen your understanding of Islam.'
                },
                {
                    name: 'keywords',
                    content: "Quran Majeed, Quran, Al-Quran , online Quran , Quran reading, Quran listening, Quran exploration, Islamic teachings, Arabic language, Islamic studies"
                },

            ],
            link: [
                { rel: 'stylesheet', href: 'fonts/noorehira.ttf' },
                { rel: 'icon', href: 'imgs/quran.ico' }
            ],

            // link: [
            // <link rel="stylesheet" href="https://myawesome-lib.css">
            // { rel: 'stylesheet', href: 'https://awesome-lib.css' }
            // ],
            // please note that this is an area that is likely to change
            style: [
                // <style type="text/css">:root { color: red }</style>
            ],
            noscript: [
                // <noscript>JavaScript is required</noscript>
                // { children: 'JavaScript is required' }
            ]
        }
    },
    // css: [
    //     '@assets/imgs/quran.ico',
    //     '@assets/fonts/noorehira.ttf'
    // ]
})
