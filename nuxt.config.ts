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
                { rel: 'icon', href: 'imgs/quran.ico' },
                { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css' },


                
            ],

            
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
