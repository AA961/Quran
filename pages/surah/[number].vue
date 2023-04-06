<script setup>
import { useRoute } from 'vue-router';
const router = useRoute()
let surahNumber = router.params.number;

const urduTranslationApi = `https://api.alquran.cloud/v1/surah/${surahNumber}/ur.maududi`
const englishTranslationApi = `https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`
const url = `https://api.alquran.cloud/v1/surah/${surahNumber}`
const { data: surah, pending } = await useFetch(url)

let surahName = ref(`${surah.value.data.englishName} - ${surah.value.data.name}`);

let selectTranslation = ref("");

let isTranslations = ref(false);
let urduTranslation = ref(null);
async function showTranslations() {

    if (selectTranslation.value == "urdu") {
        const { data: translation } = await useFetch(urduTranslationApi)
        urduTranslation.value = translation.value
        isTranslations.value = true
    } else if (selectTranslation.value == "english") {
        const { data: translation } = await useFetch(englishTranslationApi)
        urduTranslation.value = translation.value
        isTranslations.value = true
    }

}

useHead({
    title: surahName,
    meta: [
        {
            name: 'description',
            content: 'Al-Quran Online is a free website that allows you to read, listen to, and explore the Quran. Discover its teachings, learn the Arabic language, and deepen your understanding of Islam'
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
            <div v-if="pending">
                <Loading />
            </div>
            <div>
                <div class="translation-menu">
                    <select name="" id="" v-model="selectTranslation">
                        <option value="" disabled selected>Translation</option>
                        <option value="urdu" @click="showTranslations">Urdu</option>
                        <option value="english" @click="showTranslations">English</option>
                        <option value="english" @click="isTranslations = false">None</option>
                    </select>
                </div>
                <h2 class="surah-number">{{ surah.data.number }}.</h2>
                <h1 class="surah-name">{{ surah.data.name }}</h1>
                <div class="ayah" v-for="(ayahs, index) in surah.data.ayahs" :key="index">
                    <span class="ayah-number-surah">{{ ayahs.numberInSurah }}.</span>
                    <div class="ayah-text">
                        <p>{{ ayahs.text }}</p>
                    </div>
                    <div v-if="isTranslations && selectTranslation == 'urdu'" class="ayah-urdu-translation">
                        <p>{{ urduTranslation.data.ayahs[index].text }}</p>
                    </div>

                    <div v-if="isTranslations && selectTranslation == 'english'" class="ayah-english-translation">
                        <p>{{ urduTranslation.data.ayahs[index].text }}</p>
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
.container {
    padding: 2rem;
}

.translation-menu {
    select {
        padding: 6px;
        font-size: 1rem;
        cursor: pointer;

        background: var(--light);
        outline: none;
        border: none;
        border-bottom: 6px;
    }
}

.surah-number {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 8px;
    margin-right: -4px;
    text-align: right;

}

.surah-name {
    text-align: right;
    margin-right: 1rem;
}

.ayah {
    display: flex;
    margin: 2rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    .ayah-text {
        color: var(--accent);
        font-size: 2rem;
        font-weight: 500;
        word-spacing: 4px;

        p {
            font-family: 'Amiri', sans-serif !important;
            text-align: end;
        }
    }

    .ayah-urdu-translation {
        margin: 1rem auto;
        color: var(--primary);
        font-size: 1.1rem;
        font-weight: 500;
        word-spacing: 4px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        p {
            text-align: end;
            font-family: 'Noto Nastaliq Urdu', serif;

        }
    }

    .ayah-english-translation {
        margin: 1rem auto;
        color: var(--primary);
        font-size: 1.1rem;
        font-weight: 500;
        word-spacing: 4px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        p {
            text-align: start;

        }
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