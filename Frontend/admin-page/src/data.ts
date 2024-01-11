export const menuData = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "/home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Staffs",
        url: "/staffs",
        icon: "/staff.svg",
      },
      {
        id: 2,
        title: "Promotions",
        url: "/promotions",
        icon: "/promotion.svg",
      },
      
    ],
  },
  {
    id: 3,
    title: "Comming Soon",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: "/element.svg",
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "/note.svg",
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: "/form.svg",
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: "/calendar.svg",
      },
      {
        id: 5,
        title: "Orders",
        url: "/orders",
        icon: "/order.svg",
      },
      {
        id: 6,
        title: "Reviews",
        url: "/reviews",
        icon: "/review.svg",
      },
      {
        id: 7,
        title: "Settings",
        url: "/",
        icon: "/settings.svg",
      },
      {
        id: 8,
        title: "Backups",
        url: "/",
        icon: "/backup.svg",
      },
      {
        id: 9,
        title: "Charts",
        url: "/",
        icon: "/chart.svg",
      },
      {
        id: 10,
        title: "Logs",
        url: "/",
        icon: "/log.svg",
      },
    ],
  },
  // {
  //   id: 4,
  //   title: "Maintenance",
  //   listItems: [
      
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "analytics",
  //   listItems: [
      
  //   ],
  // },
];

export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Elva McDonald",
    phone: "123 456 789",
    amount: "3.668",
  },
  {
    id: 2,
    img: "https://cdn.donmai.us/original/9c/bb/__zero_two_darling_in_the_franxx_drawn_by_otomi_yuki__9cbb16b6cc2ab218a1e02d8da3d45299.jpg",
    username: "Linnie Nelson",
    phone: "123 456 789",
    amount: "3.256",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Brent Reeves",
    phone: "123 456 789",
    amount: "2.998",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Adeline Watson",
    phone: "123 456 789",
    amount: "2.512",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Juan Harrington",
    phone: "123 456 789",
    amount: "2.134",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Augusta McGee",
    phone: "123 456 789",
    amount: "1.932",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Angel Thomas",
    phone: "123 456 789",
    amount: "1.560",
  },
];

export const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Users",
  number: "11.238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
};

export const chartBoxProduct = {
  color: "skyblue",
  icon: "/productIcon.svg",
  title: "Total Products",
  dataKey: "number",
  data: {
    count: 238,
    percent: "21",
    lists: [
      { month: "2023-7", number: 400 },
      { month: "2023-8", number: 600 },
      { month: "2023-9", number: 500 },
      { month: "2023-10", number: 700 },
      { month: "2023-11", number: 400 },
      { month: "2023-12", number: 500 },

    ]
  }
    
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "/revenueIcon.svg",
  title: "Total Revenue",
  dataKey: "number",
  data: {
    count: 56.432,
    percent: "-12",
    lists: [
      { month: "2023-7", number: 400 },
      { month: "2023-8", number: 600 },
      { month: "2023-9", number: 500 },
      { month: "2023-10", number: 700 },
      { month: "2023-11", number: 400 },
      { month: "2023-12", number: 500 },

    ]
  }
};
export const chartBoxConversion = {
  color: "gold",
  icon: "/conversionIcon.svg",
  title: "Total Ratio",
  dataKey: "number",
  data: {
    count: 50,
    percent: "12",
    lists: [
      { month: "2023-7", number: 400 },
      { month: "2023-8", number: 600 },
      { month: "2023-9", number: 500 },
      { month: "2023-10", number: 700 },
      { month: "2023-11", number: 400 },
      { month: "2023-12", number: 500 },

    ]
  }
};

export const barChartBoxRevenue = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  chartData: [
    {
      name: "Sun",
      profit: 4000,
    },
    {
      name: "Mon",
      profit: 3000,
    },
    {
      name: "Tue",
      profit: 2000,
    },
    {
      name: "Wed",
      profit: 2780,
    },
    {
      name: "Thu",
      profit: 1890,
    },
    {
      name: "Fri",
      profit: 2390,
    },
    {
      name: "Sat",
      profit: 3490,
    },
  ],
};

export const barChartBoxVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

export const userRows = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    Name: "John Doe",
    Birthdate: "1/1/2000",
    JoinDate: "1/1/2023",
    PhoneNumber: "123 456 789",
    Gender: "Male",
    IdCardNumber: "123 456 789",
    Address: "HCM City",
    Position: "Sale Staff",
    Other: "ACTIVE"
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
    Name: "Manning Stella",
    Birthdate: "11/12/2000",
    JoinDate: "1/1/2023",
    PhoneNumber: "123 456 789",
    Gender: "Female",
    IdCardNumber: "123 456 789",
    Address: "HCM City",
    Position: "Sale Staff",
    Other: "ACTIVE"
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
    Name: "Mary Gerr",
    Birthdate: "11/2/2000",
    JoinDate: "1/1/2023",
    PhoneNumber: "123 456 789",
    Gender: "Female",
    IdCardNumber: "123 456 789",
    Address: "MewYork City",
    Position: "Sale Staff",
    Other: "PAUSED"
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
    Name: "Mildred Williamson",
    Birthdate: "11/2/2000",
    JoinDate: "1/1/2023",
    PhoneNumber: "123 456 789",
    Gender: "Female",
    IdCardNumber: "123 456 789",
    Address: "MewYork City",
    Position: "Sale Staff",
    Other: "INACTIVE"
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
    Name: "Jose Gross",
    Birthdate: "11/2/2000",
    JoinDate: "1/1/2023",
    PhoneNumber: "123 456 789",
    Gender: "Male",
    IdCardNumber: "123 456 789",
    Address: "MewYork City",
    Position: "Sale Staff",
    Other: "ACTIVE"
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Sharp",
    firstName: "Jeremy",
    email: "vulca.eder@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    salary: "$15,000",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Lowe",
    firstName: "Christina",
    email: "reso.bilic@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Dean",
    firstName: "Garrett",
    email: "codaic@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    salary: "$1,000",
  },
  {
    id: 9,
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Parsons",
    firstName: "Leah",
    email: "uzozor@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 10,
    img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Reid",
    firstName: "Elnora",
    email: "tuhkabapu@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    salary: "$20,000",
  },
  {
    id: 11,
    img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Dunn",
    firstName: "Gertrude",
    email: "gibo@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    salary: "$7,000",
  },
  {
    id: 12,
    img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Williams",
    firstName: "Mark",
    email: "tic.harvey@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 13,
    img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Cruz",
    firstName: "Charlotte",
    email: "ceuc@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 14,
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Harper",
    firstName: "Sara",
    email: "bafuv@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 15,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    lastName: "Griffin",
    firstName: "Eric",
    email: "ubi@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
];

export const products = [
  {
    id: 1,
    name: "Product 1",
    productLineId: 1,
  },
  {
    id: 2,
    name: "Product 2",
    productLineId: 2,
  },
  {
    id: 3,
    name: "Product 3",
    productLineId: 3,
  },
  {
    id: 4,
    name: "Product 4",
    productLineId: 4,
  },
  {
    id: 5,
    name: "Product 5",
    productLineId: 5,
  },
  {
    id: 6,
    name: "Product 6",
    productLineId: 6,
  },
  {
    id: 7,
    name: "Product 7",
    productLineId: 7,
  },
  {
    id: 8,
    name: "Product 8",
    productLineId: 8,
  },

];



export const singleUser = {
  id: 1,
  title: "John Doe",
  img: "https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  info: {
    Name: "John Doe",
    Birthdate: "1/1/2000",
    JoinDate: "1/1/2023",
    PhoneNumber: "123 456 789",
    Gender: "Male",
    IdCardNumber: "123 456 789",
    Address: "HCM City",
    Position: "Sale Staff",
    Other: "ACTIVE"
  },
  chart: {
    dataKeys: [
      { name: "sells", color: "#82ca9d" },
      { name: "checks", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        sells: 4000,
        checks: 2400,
      },
      {
        name: "Mon",
        sells: 3000,
        checks: 1398,
      },
      {
        name: "Tue",
        sells: 2000,
        checks: 3800,
      },
      {
        name: "Wed",
        sells: 2780,
        checks: 3908,
      },
      {
        name: "Thu",
        sells: 1890,
        checks: 4800,
      },
      {
        name: "Fri",
        sells: 2390,
        checks: 3800,
      },
      {
        name: "Sat",
        sells: 3490,
        checks: 4300,
      },
    ],
  },
  activities: [
    {
      text: "Staff sold receipt B41551 with a value of $500",
      time: "3 day ago",
    },
    {
      text: "Staff added 3 new items to warehouse",
      time: "1 week ago",
    },
    {
      text: "Staff damaged Sony Vaio FE14 i5 1235U worth $700",
      time: "2 weeks ago",
    },
    {
      text: "Staff reviewed a product",
      time: "1 month ago",
    },
    {
      text: "Staff added 1 new items to warehouse",
      time: "1 month ago",
    },
    {
      text: "Staff reviewed a product",
      time: "2 months ago",
    },
  ],
};
export const promotionExample = {
  id: 1,
  name: "Khuyến mãi laptop Asus TUF F15 SF560A nhân dịp tết đến",
  startDate: "11/15/2023",
  endDate: "1/15/2024",
  productVariantPurchaseName: "Product 1",
  productVariantPromotionName: "Product 2",
  value: "100.000",
  status: "ACTIVE",
  content: "ABCXYZ",
  
}

export const promotionExamples = [{
  id: 1,
  name: "Khuyến mãi laptop Asus TUF F15 SF560A nhân dịp tết đến",
  startDate: "11/15/2023",
  endDate: "1/15/2024",
  productVariantPurchaseName: "Product 1",
  productVariantPromotionName: "Product 2",
  value: "100.000",
  status: "ACTIVE",
  content: "ABCXYZ",
}]
export const singleProduct = {
  id: 1,
  title: "Playstation 5 Digital Edition",
  img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
  info: {
    productId: "Ps5SDF1156d",
    color: "white",
    price: "$250.99",
    producer: "Sony",
    export: "Japan",
  },
  chart: {
    dataKeys: [
      { name: "sells", color: "#82ca9d" },
      { name: "checks", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        sells: 4000,
        checks: 2400,
      },
      {
        name: "Mon",
        sells: 3000,
        checks: 1398,
      },
      {
        name: "Tue",
        sells: 2000,
        checks: 3800,
      },
      {
        name: "Wed",
        sells: 2780,
        checks: 3908,
      },
      {
        name: "Thu",
        sells: 1890,
        checks: 4800,
      },
      {
        name: "Fri",
        sells: 2390,
        checks: 3800,
      },
      {
        name: "Sat",
        sells: 3490,
        checks: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe purchased Playstation 5 Digital Edition",
      time: "3 day ago",
    },
    {
      text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 week ago",
    },
    {
      text: "Mike Doe purchased Playstation 5 Digital Edition",
      time: "2 weeks ago",
    },
    {
      text: "Anna Doe reviewed the product",
      time: "1 month ago",
    },
    {
      text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 month ago",
    },
    {
      text: "Helen Doe reviewed the product",
      time: "2 months ago",
    },
  ],
};
