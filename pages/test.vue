<!-- <template>
    <div>
        <button @click="getData">Get</button>
    </div>
</template>

<script setup>
import qari from '@/assets/data/qari.json';
let url = "https://api.alquran.cloud/v1/surah/1/"
let results = ref([])

async function callData(data, name) {

    const { data: surah } = await useFetch(url + data)
    let info = {
        name: name,
        iden: data,
        bitRate: surah.value.data.ayahs[1].audio.split("/")[5]
    }
    results.value.push(info)
}

function getData() {
    qari.forEach(name => {
        callData(name.identifier, name.englishName)
    });
}

// console.log(qari);
</script>

<style lang="scss" scoped></style> -->
