type callProps = {
    word1: string,
    word2: string,
    operation: string
}
type wordType = {
    words: [],
    illust1: string,
    illust2: string,
    illust3: string
}

const CallWords = async (props:callProps) => {
    const perseData:wordType = {
        words: [],
        illust1: '',
        illust2: '',
        illust3: '',
    }
    await fetch('http://localhost:8000/calc_words',{
        method: 'POST',
        // mode: 'cors', // no-cors, *cors, same-origin
        credentials: "include", // include, *same-origin, omit
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json' // JSON形式のデータのヘッダー
        },
        body: JSON.stringify({
        word1: props.word1,
        word2: props.word2,
        operation: props.operation
        })
    }).then(response => {
        return response.json()
    }).then((data) => {
        const out = JSON.parse(data);
        perseData.words = out.words;
        perseData.illust1 = out.illust1;
        perseData.illust2 = out.illust2;
        perseData.illust3 = out.illust3;
    });

    return perseData;
}

export default CallWords;