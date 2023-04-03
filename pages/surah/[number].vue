<script setup>
import { useRoute } from 'vue-router';
const router = useRoute()
let surahNumber = router.params.number;

const url = `http://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`
const { data , pending } = await useFetch(url)

let surahName = ref(`${data.value.data.englishName} - ${data.value.data.name}`)


useHead({
    title: surahName,
    meta: [
        {
            name: 'description',
            content: 'Al-Quran Online is a free website that allows you to read, listen to, and explore the Quran. Discover its teachings, learn the Arabic language, and deepen your understanding of Islam.'
        },
        {
            name: 'keywords',
            content: "Quran, Al-Quran , online Quran , Quran reading, Quran listening, Quran exploration, Islamic teachings, Arabic language, Islamic studies"
        },
        {
            name: "content-language",
            lang: 'eng'
        }
    ],
})
</script>

<template>
    <section>
        <div class="container">
            <!-- <div v-if="pending">
                <Loading />
            </div> -->
            <div>
                <h2 class="surah-number">{{ data.data.number }}.</h2>
                <h1 class="surah-name">{{ data.data.name }}</h1>
                <div class="ayah" v-for="(ayahs, index) in data.data.ayahs" :key="index">
                    <span class="ayah-number-surah">{{ ayahs.numberInSurah }}.</span>
                    <div class="ayah-text">
                        <p>{{ ayahs.text }}</p>
                    </div>
                    <div class="ayah-details">
                        <span class="ayah-number">Ayah : {{ ayahs.number }}</span>
                        <span class="surah-ruku">Ruku : {{ ayahs.ruku }}</span>
                        <span class="juz">Juz : {{ ayahs.juz }}</span>
                        <span class="manzil">Manzil : {{ ayahs.manzil }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.surah-number {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 8px;
    margin-left: -4px;
}

.ayah {
    display: flex;
    margin: 2rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .ayah-text {
        color: var(--accent);
        font-family: 'Quicksand', sans-serif;
        font-size: 1.1rem;
        font-weight: 500;
        word-spacing: 4px;
    }

    .ayah-number-surah {
        color: var(--accent);
        font-weight: 600;
        margin-bottom: 8px;
        margin-left: -4px;
    }

    .ayah-details {
        display: flex;
        justify-content: space-around;
        align-items: center;


        span {
            display: block;
            margin-left: 1rem;
            margin-top: 1rem;
        }
    }
}
</style>