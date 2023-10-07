import Product from "../../types/Product";

const productsData: Product[] = [
    {
        id: 726,
        title: "Computer (3 pictures)",
        price: 5000,
        description: "A very powerful computer with 3 pictures",
        images: [
        "https://i.imgur.com/r7CYJWI.jpeg",
        "https://i.imgur.com/4XE4KwK.jpeg",
        "https://i.imgur.com/PK1WFTJ.jpeg"
        ],
        category: {
        id: 1,
        name: "Electronics",
        image: "https://i.imgur.com/F1XLwX4.jpeg",
        }
        },
        {
        id: 727,
        title: "yuuu",
        price: 1000,
        description: "A very powerful computer",
        images: [
        "https://i.imgur.com/PK1WFTJ.jpeg"
        ],
        category: {
        id: 2,
        name: "Electronics",
        image: "https://i.imgur.com/F1XLwX4.jpeg",
        }
        },
        {
        id: 728,
        title: "Computer 3",
        price: 2000,
        description: "A very powerful computer",
        images: [
        "https://i.imgur.com/4XE4KwK.jpeg"
        ],
        category: {
        id: 3,
        name: "Electronics",
        image: "https://i.imgur.com/F1XLwX4.jpeg",
        }
        }
]

export default productsData