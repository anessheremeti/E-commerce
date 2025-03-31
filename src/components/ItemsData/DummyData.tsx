interface Item {
    id:number;
    name: string; 
    price: number; 
    img:string;
    quantity:number;
}

const DummyData: Item[] = [
    {
        id:1,
        name: 'Barcelona Jersey',
        price: 20.99,
        img:'https://imgs.search.brave.com/sVdTt-QFFKby8A6ulBPYMEhlZdOCPaYEwhjYHNoubs0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z29nb2Fsc2hvcGNs/b3VkLmNvbS91cGxv/YWQvdHRtYWxsL2lt/Zy8yMDI0MTIwNC84/YTE3MWMxMmU0M2Q1/ZDY1NmFiM2JlMWVm/YjU5OTBiNi5wbmc9/ei00MDAsNDAwX2Yt/d2VicA',
        quantity:0,
    },
    {
        id:2,
        name: 'Real Madrid Jersey',
        price: 35.99,
        img:'https://imgs.search.brave.com/_lBkfzCgwmTAAYYlQRk8Cy5Z8RjxTFUDz4WGQLTNBpw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZi5n/b2FsamVyc2V5cy5j/bi91cGxvYWQvdHRt/YWxsL2ltZy8yMDI0/MDgxNC9hNzkxZTIy/ZmY0NGU2OTM3MzBj/MDQ5NjVhZDUwYjA0/OC5wbmc9ei00Mzgs/NDM4X2Ytd2VicA',
        quantity:0,
    },
    {
        id:3,
        name: 'Milan Jersey',
        price: 50.95,
        img:'https://imgs.search.brave.com/a8eND-95jV5l3LQbiqA6b0QR-TlbH-hB2I6oSJDIhAM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZi5n/b2FsamVyc2V5cy5j/bi91cGxvYWQvdHRt/YWxsL2ltZy8yMDIx/MTEwMS80OGZkNDc0/NzZlYTgyOGZiZjU1/ZjYzOGM5YWY2YTBm/MC5wbmc9ei00Mzgs/NDM4X2Ytd2VicA',
        quantity:0,
    },
    {
        id:4,
        name: 'Manchester City Jersey',
        price: 55.25,
        img:'https://imgs.search.brave.com/oa53TuRbtOb8P0iFwB29bAFvbJEHVgUcRURIeQLUOp0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZi5n/b2FsamVyc2V5cy5j/bi91cGxvYWQvdHRt/YWxsL2ltZy8yMDI0/MDIyMy9lZTRiMjE2/MDNhZmJmNTRkYWRj/YzA1NmYzZDI5MDBk/My5wbmc9ei00Mzgs/NDM4X2Ytd2VicA',
        quantity:0,
    },
    {
        id:5,
        name: 'Arsenal  Jersey',
        price: 75.99,
        img:'https://imgs.search.brave.com/u04P0wQf9cp1CuCvotGVhHID8hvH8qCbrhcrseFUUms/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZi5n/b2FsamVyc2V5cy5j/bi91cGxvYWQvdHRt/YWxsL2ltZy8yMDI0/MTAxNS8zZTA0Mjgx/ZjRmMTA1NGQ4MDcz/OGVjODgzZWFhMTVl/Ni5wbmc9ei00Mzgs/NDM4X2Ytd2VicA',
        quantity:0,
    },
    {
        id:6,
        name: 'Bayern munich  Jersey',
        price: 75.99,
        img:'https://imgs.search.brave.com/TcjnOfoPdztmaf6PNoiCdmnP5ZnjSX4_3Me1keiBp7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZi5n/b2FsamVyc2V5cy5j/bi91cGxvYWQvdHRt/YWxsL2ltZy8yMDI0/MTEwMS8xMmMxZWQ4/MzM0Y2NlYjFjYzA1/YTc5ZmM1MmU2MmQ0/NC5wbmc9ei00Mzgs/NDM4X2Ytd2VicA',
        quantity:0,
    },
];


export default DummyData;