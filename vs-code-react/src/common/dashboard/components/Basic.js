import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItems from 'common/dashboard/components/NewsItems';
import axios from 'axios';

//스타일이 적용된 div를 가진 컴포넌트.   
const NewsListBlcok = styled.div` 
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width:100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    `;

const Basic = () => {
    const [articles, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://newsapi.org/v2/top-headlines?country=kr&apiKey=bf9e2148e87c473eb3ceacae8485618f"); // 키값은 숨겼습니다.
                setArticle(response.data.articles);
                setLoading(false);
                console.log("읽기 완료");
            }catch (e){
                console.log(e);
            }
        };
          fetchData();
        },[]); // 첫 랜더 후 한번만 호출. 비동기를 마치면 loadig 값이 수정되어 화면 출력

        if(loading) {
            return <NewsListBlcok>대기중 ....</NewsListBlcok>
        } // 첫 화면 loading 화면 구성, 만약 API가 끝마치지 않으면 계속 대기 중 출력

        if(!articles){
            console.log('articles is null');
            return null;
        } // 만약 articels가 정보를 담고 있지 않으면 Null을 반환하여 화면에 아무것도 보이지 않는다. 이 부분이 있어야 Map으로 뿌려줄 수 있다. 


    return (
        <NewsListBlcok>
            {articles.map(article => (
                <NewsItems key={article.url} article={article} />
            ))}
        </NewsListBlcok>
    );
};

export default Basic;