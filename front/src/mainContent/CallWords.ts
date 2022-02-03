type callProps = {
    word1: string,
    word2: string,
    operation: string
}
type wordType = {
    words: []
}

const CallWords = async (props:callProps) => {
    const perseData:wordType = {
        words: []
    }
    await fetch('http://localhost:8000/calc_words',{
        method: 'POST',
        credentials: "include",
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
    });

    return perseData;
}

export default CallWords;