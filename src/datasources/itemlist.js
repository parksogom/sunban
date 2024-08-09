export default {

    // 커피리스트 

    coffeeList : [
        {   
            "Id" : 101,
            "Title" : "아메리카노",
            "Info" : "폴 바셋 시그니처 블렌드로 추출한 에스프레소로 만든 부드럽고 깔끔한 가장 대중적인 커피 메뉴입니다.",
            "BasePrice" : "4700",
            "imgUrl": require("@/assets/빵/D.O.C.jpg"),
            "imgUrlOption" : {
                "hotImg" : require("@/assets/빵/D.O.C.jpg"),
                "iceImg" : require("@/assets/빵/D.O.C.jpg")
            },
            "mainOptions": {
                "IceHot" : true,
                "cupType" : true, 
            },
            "personalOptions": {
                "extraShot" : true,
                "waterAmount": true
            }
        }
    ],

    LetteList : [
        {   
            "Id" : 104,
            "Title" : "카페라떼",
            "Info" : "전통적으로 조식에 잘 마셨던 것으로 알려진 카페라떼는 에스프레소와 우유의 절묘한 조화가 매력적인 커피입니다. 에스프레소 드링크 중에서도 특히 부드럽고 향긋한 맛을 자랑합니다",
            "BasePrice" : "5700",
            "imgUrl": require("@/assets/빵/딸기생크림케이크.png"),
            "imgUrlOption" : {
                "hotImg" : require("@/assets/빵/딸기생크림케이크.png"),
                "iceImg" : require("@/assets/빵/딸기생크림케이크.png")
            },
            "mainOptions": {
                "IceHot" : true,
                "cupType" : true,
                "size": true
            },
            "personalOptions": {
                "extraShot" : true,
                "milkType": true,
            
            }
        }]
}