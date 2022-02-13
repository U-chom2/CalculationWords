import { useEffect, useState } from "react";

type callProps = {
    word: string
}


const CallPhotos = async (props:callProps) => {
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("cat");
    useEffect(() => {
        fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_CLIENT_ID}`
        )
          .then((response) => response.json())
          .then((data) => {
            setImages(data.results);
          });
      }, [query]);

    return;
}

export default CallPhotos;
//https://www.yuuuki-blog.com/2020/10/03/%E3%80%90React%E3%80%91%E7%94%BB%E5%83%8F%E6%A4%9C%E7%B4%A2%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%A6%E3%81%BF%E3%81%9F-%EF%BD%9Efecth-API%EF%BD%9E/